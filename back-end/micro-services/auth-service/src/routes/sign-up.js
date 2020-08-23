const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const { onSignUp } = require('../amqp/publish');

const SALT_ROUNDS = 10;

router.post('/', async (req, res) => {
   const {error} = validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   
   if(await User.isUserNameExist(req.body.user_name)) return res.status(400).send("User name already exist.");

   if(await User.isEmailExist(req.body.email)) return res.status(400).send("Email already exist.");

   if(await User.isMobileNumExist(req.body.mobile_num)) return res.status(400).send("Mobile number already exist.");

   password_hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
   
   const user = new User({
      user_name: req.body.user_name,
      email: req.body.email,
      mobile_num: req.body.mobile_num,
      password: password_hash
   });

   onSignUp(user);

   await user.save();

   res.send(user);
})

module.exports = router;