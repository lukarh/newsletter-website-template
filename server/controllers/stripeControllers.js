const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }) // load .env file from one directory above

const fetchStripePublishableKey = (req, res) => {
    return res.status(200).send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY})
}

module.exports = {
    fetchStripePublishableKey
}