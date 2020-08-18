const express = require('express');
const router = require('./')

const app = express();

app.use(express.json());

// Initiate MongoDB connection
require('./startup/db')();

// Use express router
app.use('/api/v1/auth', router);

const port = config.get('port');
app.listen(port, () => console.log(`Listening on ${port}...`));