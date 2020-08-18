const express = require('express');
const config = require('config');
const router = require('./routes/post');

const app = express();

app.use(express.json());

// Initiate mongoDB connection
require('./startup/db')();

// Use express router
app.use('/api/v1/post', router);

const port = config.get('port');
app.listen(port, () => console.log(`Listening on ${port}...`));