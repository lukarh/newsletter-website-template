require('dotenv').config() // load all the environment variables

var cors = require('cors') // allows any IP address to access express server

const crypto = require('crypto')
const express = require('express') // set up express server
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY) // initialize a stripe client specifically for our account
const cookieParser = require("cookie-parser")

const app = express() // get our App instance of express server, we use this to define routes, middleware, error handlers, and other settings specific to the application

const configureSession = require('./middleware/sessionMiddleware')
configureSession(app)

const connectDB = require('./config/db')

app.use(cookieParser())

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json()) // recommended by strip documentation, wants express app to use this, allow it read all the json data sent up to our server
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const stripeRoutes = require('./routes/stripeRoutes')
const verifyRoutes = require('./routes/verificationRoutes')
app.use('/api', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/stripe', stripeRoutes)
app.use('/api/verify', verifyRoutes)

// define route to handle GET requests
app.get('/config', (req, res) => {
    const data = { publishableKey: process.env.STRIPE_PUBLISHABLE_KEY }
    res.setHeader('Content-Type', 'application/json');
    res.json(data)
})

connectDB()

// start-up express server to listen for requests made on the client
app.listen(4000, () => console.log("The server is listening on port 4000..."))


// app.post("/create-stripe-customer", async(req, res) => {
//     try {
//         const { email, name, description } = req.body

//         // create a customer in stripe
//         const customer = await stripe.customers.create({ 
//             email: email,
//             name: name, 
//             description: description, 
//         })

//         res.send({ customerId: customer.id })

//     } catch (error) {
//         console.log('Error creating customer:', error);
//         res.status(500).json({ error: 'Failed to create customer' });
//     }
// })

// app.post("/create-subscription", async (req,res) => {
//     // get subscription plan ID and customer ID
//     const { priceId, customerId } = req.body

//     try {
//         // create subscription, expand subscription's latest invoice and invoice's payment_intent so 
//         // it can be passed to the front-end to confirm the payment
//         const subscription = await stripe.subscriptions.create({
//             customer: customerId,
//             items: [{
//                 price: priceId
//             }],
//             payment_behavior: 'default_incomplete',
//             payment_settings: { save_default_payment_method: `on_subscription` },
//             expand: ['latest_invoice.payment_intent']
//         })

//         res.send({
//             subscriptionId: subscription.id,
//             clientSecret: subscription.latest_invoice.payment_intent.client_secret,
//         })

//     } catch (error) {
//         return res.status(400).send({ error: { message: error.message } })
//     }
// })

// app.post("/cancel-subscription", async(req, res) => {
//     try {
//         const subscriptionId = req.body.subscriptionId

//         // cancel the subscription
//         const deletedSubscription = await stripe.subscriptions.del(subscriptionId)

//         res.send({ subscription: deletedSubscription })
//     } catch (error) { 
//         return res.status(400).send({ error: { message: error.message } })
//     }
// })

// app.post("/change-subscription", async(req, res) => {
//     try {
//         const subscriptionId = req.body.subscriptionId
//         const newSubscriptionId = req.body.newSubscriptionId

//         const subscription = await stripe.subscriptions.retrieve(subscriptionId)

//         const updatedSubscription = await stripe.subscriptions.update(
//             subscriptionId, {
//                 items: [{
//                     id: newSubscriptionId,
//                     price: p
//                 }]
//             }
//         )

//     } catch (error) {

//     }
// })

// app.post("/create-payment-intent", async (req, res) => {
//     const { productID, price } = req.body

//     console.log('the stuff:', productID, price, )

//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             currency: "USD",
//             amount: price,
//             automatic_payment_methods: { enabled: true },
//             subscription_data: {
//                 items: [{ price: productID }]
//             }
//         });
  
//         // Send publishable key and PaymentIntent details to client
//         res.send({ clientSecret: paymentIntent.client_secret });
//     } catch (e) {
//         return res.status(400).send({ error: { message: e.message } });
//     }
// })

// initialize a post request to our express erver, 
// app.post("/checkout", async (req, res) => {

//     const items = req.body.items

// })
