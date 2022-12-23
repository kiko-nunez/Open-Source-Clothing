//Variables
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Listing = require("./models/listings")
const methodOverride = require("method-override")
const userController = require("./controllers/users")
const session = require("express-session")
const sessionsController = require("./controllers/sessions")
const PORT = process.env.PORT || 3005
const DATABASE_URI = process.env.DATABASE_URI

// Load the env vars
require("dotenv").config()
// view engine setup
app.set("view engine", "ejs")

//Middleware
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)
app.use(express.static("public"))
app.use((req, res, next) => {
    next()
})

//Database Configuration
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Database Connection Error / Success
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use("/users", userController)
app.use("/sessions", sessionsController)

// Routes - INDUCES
//Index
app.get("/", (req, res) => {
    if (req.session.currentUser) {
        res.render("dashboard.ejs", {
            currentUser: req.session.currentUser
        })
    } else {
        res.render("index.ejs", {
            currentUser: req.session.currentUser
        })
    }
    // Listing.find({}, (error, listings) => {
    // res.render("index.ejs", {listings})
    // })
})

// app.get("/", (req, res) => {
//     Listing.find({}, (error, listings) => {
//     res.render("index.ejs", {listings})
//     })
// })


// INDUCES

//Listening port
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
})