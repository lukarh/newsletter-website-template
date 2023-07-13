const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }) // load .env file from one directory above

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY) // initialize a stripe client specifically for our account
const User = require('../models/users')

const fetchStripePublishableKey = (req, res) => {
    return res.status(200).send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY})
}

//////////////////////////////////////////////////////////////////////////////////////////

const getStripeCustomer = async (req) => {
    // get user id and find user in mongo database
    const id = req.session.passport.user
    const user = await User.findById(id).select('first_name last_name email');

    // find user using name and email in stripe customer database
    const name = user.first_name + " " + user.last_name
    const email = user.email

    // find customer in stripe customer database
    const customers = await stripe.customers.list({
        email: email,
        limit: 1
    })
    var customer = customers.data.find((customer) => customer.name === name)

    return customer
}

const getStripeSubscription = async (customer) => {
    // check if the customer has an active subscription
    const subscriptions = await stripe.subscriptions.list({ customer: customer.id })
    const activeSubscription = subscriptions.data.find(
        (subscription) => subscription.status === 'active'
    )
    return activeSubscription
}

const getUpcomingStripeSubscription = async (customer) => {
    // check if the customer has a trailing subscription 
    const subscriptions = await stripe.subscriptions.list({ customer: customer.id })
    const upcomingSubscription = subscriptions.data.find(
        (subscription) => subscription.status === 'trialing'
    )
    return upcomingSubscription
}

const createStripeCustomer = async (name, email, paymentMethod) => {
    // create customer in stripe database
    const customer = await stripe.customers.create({
        name: name,
        email: email,
        payment_method: paymentMethod.id,
        invoice_settings: {
            default_payment_method: paymentMethod.id
        }
    })
    return customer
}

//////////////////////////////////////////////////////////////////////////////////////////

const createSubscription = async (req, res) => {
    // get name, email, paymentMethod, priceId from request
    const { name, email, paymentMethod, priceId } = req.body

    // find customer in stripe customer database
    const customers = await stripe.customers.list({
        email: email,
        limit: 1
    })
    var customer = customers.data.find((customer) => customer.name === name)

    // check if there's no customer to be found in stripe database
    if (!customer) {
        // create new customer in stripe customer database
        try {
            customer = createStripeCustomer(name, email, paymentMethod)
        // error creating new customer in stripe database
        } catch (error) {
            return res.status(500).send({ 
                error: error.message, 
                message: 'There was an error connecting with Stripe. Please try again.' })
        }
    } 

    // check if customer already has an active subscription in the stripe database
    const activeSubscription = await getStripeSubscription(customer)
    const isExpiring = activeSubscription ? activeSubscription.cancel_at_period_end : false

    if ((activeSubscription) && (!isExpiring)) {
        return res.status(500).send({ 
            error: 'N/A',
            message: 'You have an active subscription. Please goto your account page if you want to change or cancel your current subscription.' 
        
        })
    }

    if (isExpiring) {
        const upcomingSubscription = await getUpcomingStripeSubscription(customer)

        if (upcomingSubscription) {
            return res.status(500).send({ 
                error: 'N/A',
                message: 'You already have an active subscription and an upcoming subscription plan to follow.' 
            })
        }

        try {
            const currentPeriodEnd = activeSubscription.current_period_end

            const subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: priceId }],
                trial_end: currentPeriodEnd,
            })

            return res.status(200).send({ message: 'Successfully created a subscription that will that after the current one expires.' })

        } catch (error) {
            return res.status(500).send({ 
                error: error.message,
                message: 'There was an error connecting with Stripe Subscription Services. Please try again.'
            })
        }
    }

    // create subscription if customer does not currently exist
    try {
        // create a stripe subscription object
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            default_payment_method: paymentMethod.Id,
            expand: ['latest_invoice.payment_intent'],
          })

        return res.status(200).send({ 
            message: "Successfully created a subscription that will start immediantly.", 
            subscription: subscription,  
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id 
        })

    } catch (error) {
        return res.status(500).send({ 
            error: error.message,
            message: 'There was an error connecting with Stripe Subscription Services. Please try again.'
        })
    }
}

const getSubscriptionStatus = async (req, res) => {
    // get customer info from stripe database
    const customer = await getStripeCustomer(req)

    // check if customer does not exist in database
    if (!customer) {
        return res.status(200).send({ 
            error: "User not found in Stripe Customer Database.", 
            subscription: {
                currentPlan: 'You currently do not have an active subscription.',
                nextPaymentDate: 'N/A',
                amountDue: 'N/A',
                currentPaymentMethodBrand: 'N/A',
                lastFourDigits: 'N/A',
                active: false, 
                isExpiring: false,
                upcomingSubscription: false,
            } 
        })
    }

    // get active subscription from stripe customer
    const activeSubscription = await getStripeSubscription(customer)

    // check if active subscription does not exist for customer
    if (!activeSubscription) {
        return res.status(200).send({
            error: "User does not have an active subscription.", 
            subscription: {
                currentPlan: 'You currently do not have an active subscription.',
                nextPaymentDate: 'N/A',
                amountDue: 'N/A',
                currentPaymentMethodBrand: 'N/A',
                lastFourDigits: 'N/A',
                active: false, 
                isExpiring: false,
                upcomingSubscription: false,
            }
        })
    }
    
    // get subscription plan details
    const currentPlan = activeSubscription.plan.interval_count.toString() + '-' + activeSubscription.plan.interval + ' ' + 'plan'
    const isExpiringPlan = activeSubscription.cancel_at_period_end
    const upcomingSubscription = isExpiringPlan ? await getUpcomingStripeSubscription(customer) : undefined
    const upcomingSubscriptionExists = (upcomingSubscription !== undefined)
    const nextPlan = upcomingSubscriptionExists ? upcomingSubscription.plan.interval_count.toString() + '-' + upcomingSubscription.plan.interval + ' ' + 'plan' : currentPlan

    const nextPaymentDueTimestamp = activeSubscription.current_period_end
    const nextPaymentDate = new Date(nextPaymentDueTimestamp * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    const amount = !upcomingSubscriptionExists ? activeSubscription.plan.amount : upcomingSubscription.plan.amount
    const formattedAmountDue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amount / 100)

    const currentPaymentMethodId = customer.invoice_settings.default_payment_method
    const currentPaymentMethod = await stripe.paymentMethods.retrieve(currentPaymentMethodId)


    const currentPaymentMethodBrand = currentPaymentMethod.card.brand
    const lastFourDigits = currentPaymentMethod.card.last4

    return res.status(200).send({ 
        subscription: {
            currentPlan: currentPlan,
            nextPlan: nextPlan,
            nextPaymentDate: nextPaymentDate,
            amountDue: formattedAmountDue,
            currentPaymentMethodBrand: currentPaymentMethodBrand,
            lastFourDigits: lastFourDigits,
            active: true, 
            isExpiring: isExpiringPlan,
            upcomingSubscription: upcomingSubscriptionExists
        }
    })
}

const cancelSubscription = async (req, res) => {
    // get customer info from stripe database
    const customer = await getStripeCustomer(req)

    // check if there's no customer to be found in stripe database
    if (!customer) {
        // create new customer in stripe customer database
        try {
            customer = createStripeCustomer(name, email, paymentMethod)
        // error creating new customer in stripe database
        } catch (error) {
            return res.status(500).send({ 
                error: error.message, 
                message: 'There was an error connecting with Stripe. Please try again.' })
        }
    } 

    // check if customer does not have currently have an active subscription
    const activeSubscription = await getStripeSubscription(customer)
    const isAlreadyExpiring = activeSubscription.cancel_at_period_end

    if (isAlreadyExpiring) {
        const upcomingSubscription = await getUpcomingStripeSubscription(customer)

        if (!upcomingSubscription) {
            return res.status(500).send({ 
                error: 'N/A',
                message: 'You currently do not have an active or upcoming subscription that you can cancel.' 
            })

        } else {
            const upcomingSubscriptionId = upcomingSubscription.id
            await stripe.subscriptions.del(upcomingSubscriptionId)

            return res.status(200).send({ 
                error: 'N/A',
                message:  "Successfully canceled your upcoming subscription." 
            })
        }
    }

    if (!activeSubscription) {

        return res.status(500).send({ 
            error: 'N/A',
            message: 'You currently do not have an active subscription that you can cancel.' 
        })
    }

    // attempt to cancel the subscription without any server error
    try {
        const activeSubscriptionId = activeSubscription.id
        await stripe.subscriptions.update(activeSubscriptionId, {
            cancel_at_period_end: true,
        })

        // await stripe.subscriptions.del(activeSubscriptionId)
        return res.status(200).send({ 
            message: "Successfully canceled your active subscription.",
            canceledSubscription: true
        })

    } catch (error) {
        return res.status(500).send({ 
            error: error, 
            message: "There was an error canceling your Stripe Subscription. Please try again.",
            canceledSubscription: false,
        })
    }
}

const changePaymentMethod = async (req, res) => {
    const { paymentMethod } = req.body

    // get customer info from stripe database
    const customer = await getStripeCustomer(req)

    // check if there's no customer to be found in stripe database
    if (!customer) {
        // create new customer in stripe customer database
        try {
            customer = createStripeCustomer(name, email, paymentMethod)
        // error creating new customer in stripe database
        } catch (error) {
            return res.status(500).send({ 
                error: error.message, 
                message: 'There was an error connecting with Stripe. Please try again.' })
        }
    } 

    // get customerId and update payment method
    const customerId = customer.id

    try {
        // attach the payment method to the customer
        await stripe.paymentMethods.attach(paymentMethod.id, {
            customer: customerId,
        });
        // update the default payment method of customer
        const updatedCustomer = await stripe.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: paymentMethod.id
            }
        })

        return res.status(200).send({ 
            message: "Successfully updated your payment method."
        })

    } catch (error) {       

        return res.status(500).send({
            error: error,
            message: "There was an error connecting with Stripe whilst updating your payment method. Please try again."
        })
    }
 
}

const getPublishableKey = async (req, res) => {
    return res.status(200).send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY })
}

module.exports = {
    fetchStripePublishableKey,
    createSubscription,
    createStripeCustomer,
    getSubscriptionStatus,
    getPublishableKey,
    changePaymentMethod,
    cancelSubscription
}