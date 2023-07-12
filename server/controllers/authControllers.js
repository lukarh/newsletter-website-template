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
    console.log('the notifications', notifications)
    console.log('The current session:', req.session)
    console.log('isAuthenticated', req.isAuthenticated())
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

    console.log('The new user', (newUser._id).toString())

    res.status(200).send({ message: 'showing session' })
}

module.exports = {
    loginUser,
    logoutUser,
    checkLoginStatus,
    showSession,
}



// const loginUser = async (req, res) => {
//     try {
//         console.log('Attempting to login...')
//         // get login credentials
//         const { email, password } = req.body

//         console.log('The session before login:', req.session)

//         const user = await User.findOne({ email })

//         // check if user exists in the database
//         if (!user) {
//             res.status(401).json({ error: 'Invalid Credentials' })
//             return
//         }

//         // check if password matches the one in the database
//         const isPasswordValid = await bcrypt.compare(password, user.password)

//         if (!isPasswordValid) {
//             console.log('Password is invalid!')
//             return res.status(401).json({ error: 'Invalid Credentials' })
//             return
//         }

//         console.log("Password is valid!")

//         req.session.user = {
//             id: user._id.toString(),
//             email: user.email,
//             sessionID: req.sessionID,
//         }
        
//         console.log('The session after login:', req.session)

//         console.log('---------------------------------')

//         res.status(200).json({ message: 'Login successful' })

//     } catch (error) {
//         console.log(error)

//         res.status(500).json({ error: 'Server Error.' })
//     }
// }

// const logoutUser = async (req, res) => {
//     console.log('Attempting to logout...and seeing if user info (user: {id: ..., email: ..., sessionID: ...}) exists in the session when pressing logout')
//     console.log('The session before logout:', req.session)
//     // destroy session to log out the user
//     req.session.destroy((error) => {
//         if (error) {
//             res.status(500).json({ error: 'Server error' })
//         } else {
//             console.log('The session after logout:', req.session)
//             res.status(200).json({ message: 'Logout successful' })
//         }
//     })

//     // res.redirect('/home')
// }
