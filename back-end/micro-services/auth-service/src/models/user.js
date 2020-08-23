const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require("joi");
const {privateKey} = require('../utils/key_read');

const userSchema = new mongoose.Schema({
    user_name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    verified: {type: Boolean},
    mobile_num: {type: String, required: true}
});

userSchema.methods.validatePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function(){
    const pk = privateKey();
    const token = jwt.sign({user_name: this.user_name}, pk, {
        algorithm: 'RS256',
        expiresIn: 60 * 60
    });
    return token;
};

userSchema.statics.isEmailExist = async function(email) {
   const users = await this.find({email});

   return users.length > 0;
};

userSchema.statics.isUserNameExist = async function(user_name) {
    const users = await this.find({user_name});
    return users.length > 0;
};

userSchema.statics.isMobileNumExist = async function(mobile_num){
    const users = await this.find({mobile_num});
    
    return users.length > 0;
};

userSchema.statics.findByEmail = async function(email) {
   return await this.findOne({email});
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        user_name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        mobile_num: Joi.string().length(10).required()
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;