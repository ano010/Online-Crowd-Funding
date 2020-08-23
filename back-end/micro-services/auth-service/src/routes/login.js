const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', async (req, res, next) => {
    const f = passport.authenticate('local', function(err, user, info) {
        if(err){
            res.send(err);
            return next(err);
        }
        if(info) {
            res.status(401).json(info);
            return next();
        }
        res.status(200).json(user.generateJWT());
        return next();
    })
    f(req, res, next);
});

module.exports = router;