const path = require('path')
const mongoose = require('mongoose') // import mongoose library in our node.js application
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }) // load .env file from one directory above

const connectDB = async () => {
    // attempt to connect to the mongoDB database
    try {
        await mongoose.connect(process.env.MONGODB_USERS_URI)
        console.log('Connected to MongoDB.')

    } catch (error) {
        console.log('Failed to connect to MongoDB.')
        process.exit(1)
    }
}

module.exports = connectDB;