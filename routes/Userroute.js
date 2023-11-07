const express = require("express");
const route = express.Router();
const mongoose = require("mongoose"); // Import Mongoose for MongoDB connection
const User = require("../model/Usermodels");
const createHttpError = require('http-errors');
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
// route.post('/register', async (req, res, next) => {
//     try {
//         // Extract user registration data from the request body
//         const { email, password } = req.body;

//         // Create a new user document in MongoDB
//         const newUser = new user({
//             email,
//             password,
//         });

//         // Save the new user document to the database
//         const result = await newUser.save();

//         res.status(201).json(result); // Send the newly created user as a response
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

const authSchema = require("../auth/auth_schema").authSchema;
//POST
 route.post('/register', async (req, res, next) => {
     try {
         // Extract user registration data from the request body
         const { email, password } = req.body;
            const result = await authSchema.validateAsync(req.body);

            const Exists = await User.findOne({email: email})

            if (Exists) throw createHttpError.Conflict(`${email} is already been registered`)
            const user = new User(result)

         const savedUser = await user.save()

     } catch (error) {
            if(error.isJoi === true)error.status = 422
            next(error)
     }
 });

// const authSchema = require("../auth/auth_schema").authSchema; // Import the authSchema object

// route.post('/register', async (req, res, next) => {
//     try {
//         // Extract user registration data from the request body
//         const { email, password } = req.body;

//         // Use the authSchema for validation
//         const { error, value } = authSchema.validate({
//             email: email,
//             password: password
//         });

//         if (error) {
//             // Joi validation failed
//             throw createHttpError(422, error.details[0].message);
//         }

//         const Exists = await User.findOne({ email: email });

//         if (Exists) {
//             throw createHttpError.Conflict(`${email} is already registered`);
//         }

//         const user = new User(value); // Use the validated 'value' to create the user

//         const savedUser = await user.save();

//         res.status(201).json(savedUser); // Send the newly created user as a response
//     } catch (error) {
//         if (error.isJoi === true) {
//             error.status = 422;
//         }
//         next(error);
//     }
// });




module.exports = route;
