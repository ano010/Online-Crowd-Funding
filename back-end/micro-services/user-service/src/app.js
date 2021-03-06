const express = require('express');
const config = require('config');
const router = require('./routes/user');


const app = express();

app.use(express.json());

// Initiate MongoDB connection
require("./startup/db")();

// Use express router
app.use('/api/v1/user', router);

// Initiate RabbitMQ event listening
require("./startup/event")();

const port = config.get('port');
app.listen(port, () => console.log(`Listening on ${port}...`));