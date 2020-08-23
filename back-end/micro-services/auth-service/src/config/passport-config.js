const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models/user');
const { use } = require('passport');

passport.use(new LocalStrategy({
    usernameField: "email", passwordField: "password"
}, function(email, password, done) {
    User.findOne({email}, function(err, user) {
        if(err) {
            console.log(err);
            return done(err)
        };
        if(!user) {
            console.log("User not found");
            return done(null, null, "User not found.")
        };

        // user.validatePassword(password)
        // .then(valid => {
        //     if(valid) return done(null, user);
        //     return done(null, null, "Incorrect password");
        // })
        // .catch(err => console.log("err: "+ err.message));

        done(null, user)
    })
}))