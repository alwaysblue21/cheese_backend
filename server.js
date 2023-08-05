// dependencies
//---------------------//
// for .env
require("dotenv").config();
const { PORT = 5000, DATABASE_URL } = process.env;
// for express
const express = require("express");
// for app object
const app = express();
// for mongoose
const mongoose = require("mongoose");
// for cors
const cors = require("cors");
// for morgan
const morgan = require("morgan");

//establish connection
mongoose.connect(DATABASE_URL);

// connection events
mongoose.connection
.on("open", () => console.log("You are connected to mongoose"))
.on("close", () => console.log("You are disconnected from mongoose"))
.on("error", (error) => console.log(error))

// models
//---------------------//
const cheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String
})

// middleware
//---------------------//
// cors for preventing cors errors...(allows all requests from other origins)
app.use(cors())
// morgan
app.use(morgan("dev"))
// json, express functionality to recognize incoming request objects as json objects
app.use(express.json())

// routes
//---------------------//
// test route
app.get("/", (req, res) => {
    res.json({hello: "world"})
})


// listener
//---------------------//
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
