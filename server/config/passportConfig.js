const User = require('../models/users')
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(
    new LocalStrategy(
        {
            session: true, 
            usernameField: "email"
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
          
                if (!user) {
                  return done(null, false);
                }
          
                const isPasswordValid = await bcrypt.compare(password, user.password);
          
                if (isPasswordValid) {
                  return done(null, user);
                } else {
                  return done(null, false);
                }
              } catch (error) {
                return done(error);
              }
        }
    )
)

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({ _id: id })
        done(null, user)
    } catch (error) {
        done(error)
    }
})

module.exports = passport