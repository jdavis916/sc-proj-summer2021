import express from "express";
import mongoose from "mongoose";
//import mongoSanitize from "express-mongo-sanitize";
var app = express();
//app.use(mongoSanitize());
const Schema = mongoose.Schema;
export const ContactSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String, 
        required: true
    },
    subject: {
        type: String, 
        required: true
    },
    phone: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    msg : {
        type: String, 
        required: true
    },
    date: Date
});
 // 
var ContactModel = mongoose.model("contacts", ContactSchema, "contacts");
 
module.exports = ContactModel;