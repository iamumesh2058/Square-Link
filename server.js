const express = require("express");
require("dotenv").config();

// INITIALIZING APP
const app = express();
const port = process.env.PORT



// STARTING SERVER
app.listen(port, () => {
    console.log("App started at : ", port)
})