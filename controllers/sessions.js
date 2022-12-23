// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user.js');

// New (login page)
sessionsRouter.get("/new", (req, res) => {
    res.render("sessions/new.ejs", {
        currentUser: req.session.currentUser
    })
})

// Delete (logout route)
sessionsRouter.delete("/", (req, res) => {
    req.session.destroy((error) => {
        res.redirect("/")
    })
})

// Create (login route)
sessionsRouter.post("/", (req, res) => {
    //Check for existing user
    User.findOne({
        email: req.body.email
    }, (error, foundUser) => {
        //send error message if no user is found
        if(!foundUser) {
            res.render("sessions/new.ejs", {
                currentUser: req.session.currentUser,
                errorMessage: "No user found with that email",
            })
        } else {
            //If user has been found, compare given password with hashed password
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password)
            //if passwords match
            if (passwordMatches) {
                //add the user to our session
                req.session.currentUser = foundUser
                //Redirect back to home page
                res.redirect("/")
            } else {
                // if passwords do not match
                res.render("sessions/new.ejs", {
                    currentUser: req.session.currentUser,
                    errorMessage: "Password is incorrect"
                })
            }
        }
    })
})

// Export Sessions Router
module.exports = sessionsRouter;