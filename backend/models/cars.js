import express from "express";
import mongoose from "mongoose";
import mongoSanitize from "express-mongo-sanitize";
var app = express();
app.use(mongoSanitize());
const Schema = mongoose.Schema;