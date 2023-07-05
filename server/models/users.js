const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    temp_email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
    verify_token: { type: String, required: false },
    temp_email: { type: String, required: false },
    verify_email_token: { type: String, required: false }
})

// create User model using the schema
const User = mongoose.model('User', userSchema, 'Users')

module.exports = User