const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') }) // load .env file from one directory above

const session = require('express-session')

const MongoStore = require('connect-mongo')
const passport = require('../config/passportConfig')

const configureSession = (app) => {

    const ttl = 2 * 24 * 60 * 60 * 1000; // One day in milliseconds

    app.use(session({
        name: `DaffyDuck`,
        secret: process.env.SERVER_SECRET_KEY,  
        resave: false,
        saveUninitialized: false,
        cookie: { 
            secure: false, // This will only work if you have https enabled!
            maxAge: ttl 
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_SESSIONS_URI,
            ttl: 14 * 24 * 60 * 60 // = 14 days. 
        })
    }))

    app.use(passport.initialize());
    app.use(passport.session());

    console.log('finished creating session')

}

module.exports = configureSession;