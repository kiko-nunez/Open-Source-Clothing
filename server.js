//Variables
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Listing = require("./models/listings")
const methodOverride = require("method-override")
const userController = require("./controllers/users")
const session = require("express-session")
const sessionsController = require("./controllers/sessions")
const User = require("./models/user")
// const listings = require("./models/listings")
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
        Listing.find({}, (error, listings) => {
            res.render("dashboard.ejs", {
            listings,
            currentUser: req.session.currentUser,
        })
    })
    } else {
        res.render("index", {
            currentUser: req.session.currentUser,
        })
    }
})

// New
app.get("/new", (req, res) => {
    res.render("new", {
        currentUser: req.session.currentUser
    })
})

//Delete
app.delete("/:id", (req, res) => {
    Listing.findByIdAndDelete(req.params.id, (err) => {
        res.redirect("/")
    })
})

//Update
app.put("/:id", (req, res) => {
    Listing.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    },
    (error, listing) => {
        res.redirect("/")
    })
})

//Create
app.post("/", (req, res) => {
    Listing.create(req.body, (error, listing) => {
        res.redirect("/")
    })
})

//Edit
app.get("/:id/edit", (req, res) => {
    Listing.findById(req.params.id, (error, listing) => {
        res.render("edit", {listing})
    })
})

//Show
app.get("/:id", (req, res) => {
    Listing.findById(req.params.id, (error, listing) => {
        res.render("show", {listing})
    })
})

//Listening port
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
})