import express from "express";
import mongoose from "mongoose";
import mongoSanitize from "express-mongo-sanitize";
var app = express();
app.use(mongoSanitize());
const Schema = mongoose.Schema;
export const contactSchema = new Schema({
    name: String,
    subject: String,
    phone: String,
    email: String,
    msg : String,
    date: Date
});
 // 
var formModel = mongoose.model("contacts", contactSchema);
 
module.exports = formModel;