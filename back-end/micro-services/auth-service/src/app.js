const express = require('express');
const signUpRouter = require('./routes/sign-up');
const loginRouter = require('./routes/login');
const config = require("config");
const passport = require('passport');

const app = express();

app.use(express.json());

// Initiate MongoDB connection
require('./startup/db')();

// Initializw passport
app.use(passport.initialize());

// Import passport configuration
require('./config/passport-config');

// Use express router
app.use('/api/v1/sign-up', signUpRouter);
app.use('/api/v1/login', loginRouter);

const port = config.get('port');
app.listen(port, () => console.log(`Listening on ${port}...`));