const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../model/Usermodels');

module.exports ={
    signAccessToken:(User)=>{
        return new Promise((resolve, reject)=>{
            const payload ={}
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '1h',
                issuer: 'Alextech.com',
                audience: User,
            }
            JWT.sign(payload, secret, options, (error, token)=>{
                if(error){
                    console.log(error.message)
                    reject(createError.InternalServerError());
                }
                resolve(token);
            })
        })
    }
}