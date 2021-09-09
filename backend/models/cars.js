import express from "express";
import mongoose from "mongoose";
//import mongoSanitize from "express-mongo-sanitize";
var app = express();
//app.use(mongoSanitize());
const Schema = mongoose.Schema;
export const CarSchema = new Schema({
	_id: {
        type: Number
    },
	year: {
		type: Number,
        strict: false
	},
  	make: {
  		type: String,
        strict: false
  	},
  	model: {
		type: String,
        strict: false
  	},
  	type: {
  		type: String,
        strict: false
  	},
  	doors: {
  		type: Number,
        strict: false
  	},
  	seats: {
  		type: Number,
        strict: false
  	},
  	color:{
  		type: String,
        strict: false
  	},
  	price:{
  		type: Number,
        strict: false
  	},
  	img: {
  		type: String,
        strict: false
  	}
});
var CarModel = mongoose.model("cars", CarSchema, "cars");
 
module.exports = CarModel;