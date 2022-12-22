//Variables
const express = require("express")
const mongoose = require("mongoose")
const Listing = require("./models/listings")
const app = express()
const methodOverride = require("method-override")

// Load the env vars
require("dotenv").config()
// view engine setup
app.set("view engine", "ejs")


const PORT = process.env.PORT || 3005
const DATABASE_URI = process.env.DATABASE_URI

mongoose.connect(process.env.DATABASE_URI)
const db = mongoose.connection

//Middleware
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use((req, res, next) => {
    next()
})

// Routes - INDUCES
//Index
app.get("/", (req, res) => {
    Listing.find({}, (error, listings) => {
    res.render("index.ejs", {listings})
    })
})

app.get("/", (req, res) => {
    Listing.find({}, (error, listings) => {
    res.render("index.ejs", {listings})
    })
})


// INDUCES

//Listening port
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
})