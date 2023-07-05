const express = require('express')
const router = express.Router()
const StripeControllers = require('../controllers/stripeControllers')

// Route for logging-out
router.get('/config', StripeControllers.fetchStripePublishableKey)

module.exports = router;