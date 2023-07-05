const express = require('express')
const router = express.Router()
const VerificationController = require('../controllers/verificationControllers')

// Route for verifying the user's account
router.put('/account', VerificationController.verifyAccount)

// Route for verifying the user's change of email
router.put('/email', VerificationController.verifyEmail)

// Route for sending the user a verification email for their new email
router.put('/send-email/v2', VerificationController.sendVerificationEmail)

// Route for sending the user a verification email for their account
router.put('/send-email', VerificationController.sendVerificationAccountEmail)

module.exports = router;
