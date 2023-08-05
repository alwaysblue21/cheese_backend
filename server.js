// dependencies
//---------------------//
//for .env
require("dotenv").config();
const { PORT = 5000, DATABASE_URL } = process.env;
//for express
const express = require("express");
//for app object
const app = express();
// for mongoose
const mongoose = require("mongoose");

//establish connection
mongoose.connect(DATABASE_URL);

//connection events
mongoose.connection
.on("open", () => console.log("You are connected to mongoose"))
.on("close", () => console.log("You are disconnected from mongoose"))
.on("error", (error) => console.log(error))

// routes
//---------------------//
// test route
app.get("/", (req, res) => {
    res.json({hello: "world"})
})


// listener
//---------------------//
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
