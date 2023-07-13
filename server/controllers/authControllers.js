const bcrypt = require('bcrypt')
const User = require('../models/users')
const Notifications = require('../models/notifications')
const passport = require('../config/passportConfig')

const loginUser = (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) throw error
        if (!user) res.status(401).send({ message: "Invalid Credentials", redirect: '' })
        if (!user.verified) res.status(401).send({ message: "You must verify your account first before logging in.", redirect: '' })
        else {
            req.logIn(user, error => {
                if (error) throw error
                res.status(200).send({ message: 'Successfully Logged In', redirect: '/home' })
            })
        }
    })(req, res, next)
}

const logoutUser = (req, res) => {
    req.logout((error) => {
        if (error) throw (error)
        res.status(200).send({ message: 'Logout successful', redirect: '/home' })
    })
}

const checkLoginStatus = async (req, res) => {
    // check if session exists 
    if (req.session.passport) {
        return res.status(200).send({ isLoggedIn: true })
    }

    return res.status(200).send({ isLoggedIn: false })

}

const showSession = async(req, res) => {
    // show session
    const notifications = await Notifications.find()

    const data = { data: req.session, cookies: req.cookies }

    const newUser = new User({
        first_name: 'test',
        last_name: 'test',
        email: 'test',
        password: 'test',
        phone: 'test',
        role: 'test',
        verifiedEmail: false,
    })

    return res.status(200).send({ message: 'showing session' })
}

module.exports = {
    loginUser,
    logoutUser,
    checkLoginStatus,
    showSession,
}
