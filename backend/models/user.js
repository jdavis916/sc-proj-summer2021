import express from "express";
import mongoose from "mongoose";
//import mongoSanitize from "express-mongo-sanitize";
var app = express();
//app.use(mongoSanitize());
var passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
export const User = new Schema({
    _id: Schema.Types.ObjectId,
    role: {
        type: String, 
        default: 'user'
    },
    f_name: {type: String, required: true},
    l_name: {type: String, required: true},
    email: {type: String, required: true},
    username: {
        type: String, 
        required: true,
        strict: false
    },
    phone: {
        type: String,
        required: true,
        strict: false
    },
    password: {
        type: String, 
        required: true,
        strict: false
    },
    prof_pic: {
        type: String, 
        default: '',
        strict: false
    },
    address: {
        type: String, 
        default: '',
        strict: false
    },
    // inquiries: [{
    //     type: Schema.Types.ObjectId, 
    //     ref: 'contact',
    //     default: []
    // }],
    rides: [{
        type: Schema.Types.ObjectId, 
        ref: 'Rides',
        default: [],
        strict: false
    }],
    ride_count: {
        type: Number, 
        default: 0,
        strict: false
    },
    // reward_status: {
    //     type: String, 
    //     default: ''
    // },
    // voucher_tokens: {
    //     type: Number, 
    //     default: 0
    // },
    // used_coupons: {
    //     coupon_id: [{
    //         type: Schema.Types.ObjectId, 
    //         ref: 'Coupons',
    //         default: []
    //     }]
    // },
    pay: {
        method_name: {
            type: String, 
            default: '',
            strict: false
        },
        // token_id: String,
        // token: {
        //     type: String, 
        //     default: ''
        // },
        exp_date: Date,
        active: {
            type: Boolean, 
            default: true,
            strict: false
        }
    }
});
User.plugin(passportLocalMongoose);
var UserModel = mongoose.model("users", User);
 
module.exports = UserModel;