const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }) // load .env file from one directory above

const nodemailer = require('nodemailer');

const sendVerifyEmail = async (email, verificationToken) => {
    // create verification link
    const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_HOST_USER,
                pass: process.env.EMAIL_HOST_PASSWORD
            }
        })
    
        const info = await transporter.sendMail({
            from: "info@mailtrap.club",
            to: email, 
            subject: "Verify your email change at The DHO.", 
            text: "Hello world?", 
            html: `Click the following link to verify your email change: <a href="${verificationLink}">Verify your account.</a>`
        });
        
    } catch (error) {
        throw new Error('Failed to send verification email.');
    }
}

const sendVerifyAccountEmail = async (email, verificationToken) => {
    // create verification link
    const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_HOST_USER,
                pass: process.env.EMAIL_HOST_PASSWORD
            }
        })
    
        const info = await transporter.sendMail({
            from: "info@mailtrap.club",
            to: email, 
            subject: "Verify your account at The DHO.", 
            text: "Hello world?", 
            html: `Click the following link to verify your account: <a href="${verificationLink}">Verify your account.</a>`
        });
        
    } catch (error) {
        throw new Error('Failed to send verification email.');
    }
}

module.exports = {
    sendVerifyEmail,
    sendVerifyAccountEmail,
}