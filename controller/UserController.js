const User = require('../model/Usermodels');
const createError = require('http-errors'); // You need to require the 'http-errors' library
const mongoose = require('mongoose');

module.exports = {
    Adduser: async (req, res) => {
        try {
            const user = new User(req.body);
            const result = await user.save();
            res.send(result);
        } catch (error) {
            console.error(error.message);
        }
    },
    getUser: async (req, res, next) => {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
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
    },
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
