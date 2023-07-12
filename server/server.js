require('dotenv').config() // load all the environment variables

var cors = require('cors') // allows any IP address to access express server

const express = require('express') // set up express server
const cookieParser = require("cookie-parser")

const app = express() // get our App instance of express server, we use this to define routes, middleware, error handlers, and other settings specific to the application

const configureSession = require('./middleware/sessionMiddleware')
configureSession(app)

const connectDB = require('./config/db')

app.use(cookieParser())

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json()) // recommended by strip documentation, wants express app to use this, allow it read all the json data sent up to our server
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const stripeRoutes = require('./routes/stripeRoutes')
const verifyRoutes = require('./routes/verificationRoutes')
app.use('/api', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/stripe', stripeRoutes)
app.use('/api/verify', verifyRoutes)

connectDB()

// start-up express server to listen for requests made on the client
app.listen(4000, () => console.log("The server is listening on port 4000..."))

// // define route to handle GET requests
// app.get('/config', (req, res) => {
//     const data = { publishableKey: process.env.STRIPE_PUBLISHABLE_KEY }
//     res.setHeader('Content-Type', 'application/json');
//     res.json(data)
// })