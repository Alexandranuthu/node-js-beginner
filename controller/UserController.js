const user = require('../model/Usermodels');
// const createError = require('http-errors'); // You need to require the 'http-errors' library
const mongoose = require('mongoose');

module.exports = {
    AddUser: async (req, res) => {
        try {
            const student = new User(req.body);
            const result = await user.save();
            res.send(result);
        } catch (error) {
            console.error(error.message);
        }
    }
}