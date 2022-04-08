/*jshint esversion: 6 */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const photo = new Schema ({
    title : String,
    description : String,
    imageURL: String,
    public_id: String
});

module.exports = model("photo",photo);