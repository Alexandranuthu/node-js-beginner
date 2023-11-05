const express = require("express");
const route = express.Router();
const user = require("../model/Usermodels");
// const UserController= require('../controller/UserController');


// Get a list of students from the database
route.get('register', async (req, res) => {
    try {
        const result = await user.find({});
        res.send(result); // Sending the result as the response
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = route;