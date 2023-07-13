const express = require('express')
const router = express.Router()
const StripeControllers = require('../controllers/stripeControllers')

// Route for subscribing
router.post('/subscribe', StripeControllers.createSubscription)

// Route for creating stripe customer
router.post('/create-customer', StripeControllers.createStripeCustomer)

// Route for getting subscriiption status
router.get('/subscription-status', StripeControllers.getSubscriptionStatus)

// Route for getting stripe key
router.get('/config', StripeControllers.getPublishableKey)

// Route for updating customer's payment method
router.put('/change-payment-method', StripeControllers.changePaymentMethod)

// Route for canceling user subscription
router.delete('/cancel-subscription', StripeControllers.cancelSubscription)

module.exports = router;