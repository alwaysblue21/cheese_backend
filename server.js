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
const cheesesSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String
})

const Cheeses = mongoose.model("Cheeses", cheesesSchema)

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
// we dont need new, and edit...just iducs..

// index 
app.get("/cheeses", async (req, res) => {
    try {
        const cheeses = await Cheeses.find({})
        res.json(cheeses)
    } catch (error) {
        res.status(400).json({error})
    }

})

// create
app.post("/cheeses", async (req, res) => {
    try {
        const cheese = await Cheeses.create(req.body)
        res.json(cheese)
    } catch (error) {
        res.status(400).json({error})
    }
})

// show
app.get("/cheeses/:id", async (req, res) => {
    try {
        const cheese = await Cheeses.findById(req.params.id)
        res.json(cheese)
    } catch (error) {
        res.status(400).json({error})
    }
})

// update
app.put("/cheeses/:id", async (req, res) => {
    try {
        const cheese = await Cheeses.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(cheese)
    } catch (error) {
        res.status(400).json({error})
    }
})

// delete
app.delete("/cheeses/:id", async (req, res) => {
    try {
        const cheese = await Cheeses.findByIdAndDelete(req.params.id)
        res.status(204).json(cheese)
    } catch (error) {
        res.status(400).json({error})
    }
})


// test route
app.get("/", (req, res) => {
    res.json({hello: "world"})
})


// listener
//---------------------//
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
