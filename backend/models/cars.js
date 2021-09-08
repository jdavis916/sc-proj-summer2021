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
		type: Number
	},
  	make: {
  		type: String
  	},
  	model: {
		type: String
  	},
  	type: {
  		type: String
  	},
  	doors: {
  		type: Number
  	},
  	seats: {
  		type: Number
  	},
  	color:{
  		type: String
  	},
  	price:{
  		type: Number
  	},
  	img: {
  		type: String
  	}
});
var CarModel = mongoose.model("cars", CarSchema, "cars");
 
module.exports = CarModel;