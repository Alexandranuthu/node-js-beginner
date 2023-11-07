const User = require('../model/Usermodels');
const createError = require('http-errors'); // You need to require the 'http-errors' library
const mongoose = require('mongoose');
const authSchema = require("../auth/auth_schema").authSchema;
const createHttpError = require('http-errors');
const { signAccessToken } = require('../helpers/JWThelper');

module.exports = {

    //add user works
    Adduser: async (req, res, next) => {
     try {
         // Extract user registration data from the request body
         const { email, password } = req.body;
            const result = await authSchema.validateAsync(req.body);

            const Exists = await User.findOne({email: email})

            if (Exists) throw createHttpError.Conflict(`${email} is already been registered`)
            const user = new User(result)

         const savedUser = await user.save()
         const accessToken = await signAccessToken(savedUser.id)
         res.send({accessToken});

     } catch (error) {
            if(error.isJoi === true)error.status = 422
            next(error)
     }
 },


    getUser:  async (req, res) => {
        try {
            const result = await User.find({});
            res.send(result); // Sending the result as the response
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },

    updateUser:async(req, res, next) => {
        try{
            const id = req.params.id;
            const update = req.body;
            const options = {new: true}
            const result = await User.findByIdAndUpdate(id, update, options)
            
            res.send(result);
        }catch(error){
            console.log(error.message)
        }
    },
 
    
    

    //DELETE USER WORKS
    deleteUser: async (req, res, next) => {
        const id = req.params.id;
        try {
            const user = await User.findByIdAndRemove(id);
            if (!user) {
                throw createError(404, "User does not exist");
            }
            res.send(user);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid user id"));
                return;
            }
            next(error);
        }
    }
};
