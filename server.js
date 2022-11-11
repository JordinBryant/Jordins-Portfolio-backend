// Import Dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// Import JSON file
const projects = require("./projects.json");
const path = require("path");


// mongodb error / success 
const db = mongoose.connection
db.on('error', (err) => console.log(`${err.message} is Mongod not running?`))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))


// Create our app object
const app = express();

// set up middleware
app.use(cors());

//home route for testing our app
// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

// route for retrieving projects
app.get("/projects", (req, res) => {
    // send projects via JSON
    res.json(projects);
});
// in production 
// if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"client","build","index.html"))
    })
// }

//declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));