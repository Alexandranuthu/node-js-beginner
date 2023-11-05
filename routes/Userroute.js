const express = require("express");
const route = express.Router();
const user = require("../model/Usermodels"); // Make sure to import your User model
const mongoose = require("mongoose"); // Import Mongoose for MongoDB connection

// Connect to your MongoDB database


// Get a list of registered users from the database
route.get('/register', async (req, res) => {
    try {
        const result = await user.find({});
        res.send(result); // Sending the result as the response
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
//POST
route.post('/register', async (req, res) => {
    try {
        // Extract user registration data from the request body
        const { email, password } = req.body;

        // Create a new user document in MongoDB
        const newUser = new user({
            email,
            password,
        });

        // Save the new user document to the database
        const result = await newUser.save();

        res.status(201).json(result); // Send the newly created user as a response
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = route;
