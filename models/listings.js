const { urlencoded } = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const listingSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String},
    img: {type: String, required: true},
    price: {type: Number, required: true},
    size: {type: String},
    qty: {type: Number},
    })

const Listings = mongoose.model("Listing", listingSchema)    
module.exports = Listings;
    