import express from "express";
import mongoose from "mongoose";
//import mongoSanitize from "express-mongo-sanitize";
var app = express();
//app.use(mongoSanitize());
var passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
export const User = new Schema({
    uid: Number,
    role: {
        type: String, 
        default: 'user'
    },
    f_name: String,
    l_name: String,
    email: String,
    username: String,
    password: String,
    prof_pic: String,
    address: String, 
    inquiries: {
        inq_id: String,
        date: Date
    },
    rides: Array,
    ride_count: {
        type: Number, 
        default: 0
    },
    reward_status: String,
    voucher_tokens: {
        type: Number, 
        default: 0
    },
    used_coupons: {
        coupon_id: String,
        date_used: Date
    },
    pay: {
        method_name: String,
        token_id: String,
        token: String,
        exp_date: Date,
        active: {
            type: Boolean, 
            default: true
        }
    }
});
User.plugin(passportLocalMongoose);
var userModel = mongoose.model("users", User);
 
module.exports = userModel;