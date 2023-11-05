const { Schema } = require("mongoose");
const userSchema = new Schema({
    email:{
      type: String,
      required: true,
      unique: true,  
    },
    password:{
        type: String,
        required: true,
    }
    
});

const User= mongoose.model('User', userSchema);
module.exports = userSchema;

//joi-validation
//create folder in rote dire auth, inside the auth we''ll use it fot the validation
//file name is auth_schema
