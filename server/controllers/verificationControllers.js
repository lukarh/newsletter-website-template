const bcrypt = require('bcrypt')
const crypto = require('crypto')

const User = require('../models/users')
const emailServices = require('../services/emailServices.js')

const generateUniqueToken = async () => {
    return crypto.randomBytes(32).toString('hex')
}

const generateVerificationToken = async () => {
    const verificationToken = await generateUniqueToken()
    return verificationToken
}

const sendVerificationEmail = async (req, res) => {
    try {
        // get userID and email
        const id  = req.session.passport.user
        const { email } = req.body

        // check if user does not exist, return message saying user not found
        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(404).send({ error: 'User not found.' })
        }

        const userWithEmail = await User.findOne({ email: email })
        if (userWithEmail) {
            return res.status(404).send({ error: 'User with this email already exists.' })
        }

        // generate a verification token and save it to the database
        const verificationToken = await generateVerificationToken();
        user.verify_email_token = verificationToken
        user.temp_email = email
        await user.save()

        // send verification email
        await emailServices.sendVerifyEmail(user.email, verificationToken)
        res.status(200).send({ message: 'Verification email sent.' })

    } catch (error) {
        res.status(500).send({ error: 'Failed to send verification email.' })
    }
}

const sendVerificationAccountEmail = async (req, res) => {
    try {
        // find the user by email in database
        const { email } = req.body
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(404).send({ error: 'User not found.' })
        }

        // generate a verification token and save it to the database
        const verificationToken = await generateVerificationToken();
        user.verify_token = verificationToken
        await user.save()

        // send verification email
        await emailServices.sendVerifyAccountEmail(email, verificationToken)
        res.status(200).send({ message: 'Verification email sent.' })

    } catch (error) {
        res.status(500).send({ error: 'Failed to send verification email.' })
    }
}

const verifyAccount = async (req, res) => {
    try {
        // get verification token of the user
        const { verifyToken } = req.body

        // check if user does not exist, return message saying user not found
        const user = await User.findOne({ verify_token: verifyToken })
        if (!user) {
            return res.status(404).send({ error: 'User not found.' })
        }

        // update and save the user's verified status as TRUE
        user.verified = true
        user.verify_token = ''
        await user.save()

        return res.status(200).send({ message: 'Successfully verified your account.' })
    // else unable to process the request
    } catch (error) {
        res.status(400).json({ message: '', error: error.message })
    }
}

const verifyEmail = async (req, res) => {
    try {
        // get the verification token
        const { verifyToken } = req.body

        // check if user does not exist, return message saying user not found
        const user = await User.findOne({ verify_email_token: verifyToken })
        if (!user) {
            return res.status(404).send({ error: 'User not found.' })
        }

        // update and save the user's verified status as TRUE
        user.email = user.temp_email
        user.temp_email = ''
        user.verify_email_token = ''
        await user.save()

        return res.status(200).send({ message: 'Successfully verified your email change.' })
    // else unable to process the request
    } catch (error) {
        res.status(400).json({ message: '', error: error.message })
    }
}

module.exports  = {
    sendVerificationEmail,
    sendVerificationAccountEmail,
    verifyEmail,
    verifyAccount,
}