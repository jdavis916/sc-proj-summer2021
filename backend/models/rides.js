import express from "express";
import mongoose from "mongoose";
//import mongoSanitize from "express-mongo-sanitize";
var app = express();
//app.use(mongoSanitize());
const Schema = mongoose.Schema;
export const RideSchema = new Schema({
	_id: Schema.Types.ObjectId,
	user: {
		type: String
	},
	start: {
		type: Date,
		default: ''
	},
	end: {
		type: Date,
		default: ''
	},
	payment: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		default: ''
	},
	car: {
		type: String,
		default: ''
	},
	start_location: {
		type: String,
		default: ''
	}
});
 // 
var RideModel = mongoose.model("rides", RideSchema, "rides");
 
module.exports = RideModel;