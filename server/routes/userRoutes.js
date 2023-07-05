const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userControllers')

// Route for creating a new user
router.post('/users', UserController.createUser)

// Route for checking if a user exists with an email
router.get('/users/check-email', UserController.getUserByEmail)

// Route for getting a user by ID
router.get('/users/profile', UserController.getUserById)

// Route for getting a user's notification preferences
router.get('/users/notifications', UserController.getUserNotificationPrefs)

// Route for updating the email of a user by ID
router.put('/users/change-email', UserController.updateUserEmail)

// Route for updating the password of a user by ID
router.put('/users/change-password', UserController.updateUserPassword)

// Route for updating the notification preferences of a user by ID
router.put('/users/change-notifications', UserController.updateUserNotificationPrefs)

// Route for deleting a user in the database
router.delete('/users/:id', UserController.deleteUser)

module.exports = router;