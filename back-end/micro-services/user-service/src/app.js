const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());

// Initiate MongoDB connection
require("./startup/db")();

// Import express router
const router = require('./routes/user');
app.use('/api/v1/user', router);


app.listen('4000', () => {
    console.log('Listening on 4000...');
});