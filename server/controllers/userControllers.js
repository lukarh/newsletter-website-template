const bcrypt = require('bcrypt')
const User = require('../models/users')
const Notifications = require('../models/notifications')

// (POST) create a new user in mongoDB function
const createUser = async (req, res) => {
    try {
        // get information from requests to use and verification token
        const { firstName, lastName, email, password, phone, role } = req.body

        // check if a user exists with that email
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'It seems you already have an account, please log in instead.' })
        }

        // hash the password input and create the new user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: hashedPassword,
            phone: phone,
            role: role,
            verified: false,
        })

        // create new user's notification preferences
        const newUserNotificationsPrefs = new Notifications({
            user_id: (newUser._id).toString(),
            daily_notifications: false,
            weekly_notifications: false,
            feedbacks_surveys: false,
            offers_promotions: false,
            account_subscriptions: false,
            phone_notifications: false,
        })

        // save the new user to database
        const savedUser = await newUser.save()
        const savedUserNotificationPrefs = await newUserNotificationsPrefs.save()

        return res.status(201).send({ message: 'Successfully registered.' })

    } catch (error) {
        // let the client know it failed the request due to malformed syntax or invalid params
        return res.status(400).send({ error: error.message })
    }
}

// (GET) find user by id
const getUserById = async (req, res) => {
    try {
        // find user in mongoDB database by ID
        const id = req.session.passport.user
        const user = await User.findById(id).select('-password -_id -__v');

        // check if user does not exists after searching
        if (!user) {
            return res.status(404).json({ error: 'User not found.' })
        }

        return res.status(200).send({ user: user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// (GET) find notification preferences of the user
const getUserNotificationPrefs = async (req, res) => {
    try {
        // find user in mongoDB notifications database by user ID
        const id = req.session.passport.user
        const user = await Notifications.findOne({ user_id: id });

        // check if user does not exists after searching
        if (!user) {
            return res.status(404).json({ error: 'User not found.' })
        }

        res.status(200).send({ userNotificationPrefs: user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// (GET) find user by email
const getUserByEmail = async (req, res) => {
    try {
        // get user email
        const { email } = req.query

        console.log('The server received the following email:', email)

        // find user by email in mongoDB database
        const user = await User.findOne({ email })

        // return if user, or email in other words, has been used
        console.log('The email is already in use:', !!user)
        res.json({ exists: !!user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// (PUT) update user's email in database by looking at id
const updateUserEmail = async (req, res) => {
    try {
        // get user ID
        const { id } = req.params
        const { email } = req.body

       // update the email in database
        const updatedUser = await User.findByIdAndUpdate(
            id, { email }, { new: true }
        )

        // check if user exists after searching
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' })
        }

        res.json(updatedUser)
    // else unable to process the request
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// (PUT) update user's password in database by looking at id
const updateUserPassword = async (req, res) => {
    try {
        // get password inputs and userID
        const { oldPassword, newPassword } = req.body
        const id  = req.session.passport.user

        // check if user does not exist, return message saying user not found
        const user = await User.findOne({ _id: id }).select('_id password')
        if (!user) {
            return res.status(404).send({ error: 'User not found.' })
        }

        // check if old password input is correct
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Please make sure you've correctly typed in your previous password." })
        } else {
            // hash the new password and update password
            const newHashedPassword = await bcrypt.hash(newPassword, 10)
            user.password = newHashedPassword
            await user.save()

            return res.status(200).send({ message: 'Successfully changed your password.' })
        }



    // else unable to process the request
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// (PUT) update user's notification preferences in database by looking at id and getting their new preferences
const updateUserNotificationPrefs = async (req, res) => {
    try {
        // get notification preferences and userID
        const id  = req.session.passport.user
        const {
            daily_notifications,
            weekly_notifications,
            feedbacks_surveys,
            offers_promotions,
            account_subscriptions,
            phone_notifications
        } = req.body

        // check if user does not exist, return message saying user not found
        const user = await Notifications.findOne({ user_id: id })
        if (!user) {
            return res.status(404).send({ error: 'User not found.' })
        }

        // update and save the user's notification preferences
        user.daily_notifications = daily_notifications
        user.weekly_notifications = weekly_notifications
        user.feedbacks_surveys = feedbacks_surveys
        user.offers_promotions = offers_promotions
        user.account_subscriptions = account_subscriptions
        user.phone_notifications = phone_notifications
        await user.save()

        return res.status(200).send({ message: 'Successfully changed notification preferences.' })

    // else unable to process the request
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// (DELETE) delete current user in database by id
const deleteUser = async (req, res) => {
    try {
        // get user ID
        const { id } = req.params

        // find user in the database by ID and delete it
        const deletedUser = await User.findbyIdAndDelete(id)

        // check if there was no user of that ID to delete
        if (!deletedUser) {
            return res.status(404).json({ error: 'User does not exist.' })
        }

        res.json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports  = {
    createUser,
    getUserById,
    getUserNotificationPrefs,
    getUserByEmail,
    updateUserEmail,
    updateUserPassword,
    updateUserNotificationPrefs,
    deleteUser,
}