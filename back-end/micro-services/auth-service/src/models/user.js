const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    user_name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    verified: {type: Boolean},
    mobile_num: {type: String, required: true}
});

userSchema.validatePassword = function(password){
    return bcrypt.compare(password, this.password);
};

userSchema.generateJWT = function(){
    
}