const express = require('express')
const router = express.Router()
const AuthControllers = require('../controllers/authControllers')

// Route for logging-in
router.post('/login', AuthControllers.loginUser)

// Route for checking if a user is logged in
router.get('/login-status', AuthControllers.checkLoginStatus)

// Route for showing session
router.get('/session', AuthControllers.showSession)

// Route for logging-out
router.get('/logout', AuthControllers.logoutUser)

module.exports = router;