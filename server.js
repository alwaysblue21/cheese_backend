// dependencies
//---------------------//
//for .env
require("dotenv").config();
const { PORT = 5000 } = process.env;
//for express
const express = require("express");
//for app object
const app = express();

// routes
//---------------------//
// test route
app.get("/", (req, res) => {
    res.json({hello: "world"})
})


// listener
//---------------------//
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
