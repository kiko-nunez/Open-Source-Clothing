const { urlencoded } = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const listingSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String},
    img: {type: String},
    price: {type: Number, required: true},
    qty: {type: Number},
    })

    module.exports = mongoose.model("Listings", listingSchema)