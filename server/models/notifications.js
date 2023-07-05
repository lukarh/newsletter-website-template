const mongoose = require('mongoose')

const notificationsSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    daily_notifications: { type: Boolean, required: true },
    weekly_notifications: { type: Boolean, required: true },
    feedbacks_surveys: { type: Boolean, required: true },
    offers_promotions: { type: Boolean, required: true },
    account_subscriptions: { type: Boolean, required: true },
    phone_notifications: { type: Boolean, required: true },
})

// create User model using the schema
const Notifications = mongoose.model('Notifications', notificationsSchema, 'Notifications')

module.exports = Notifications