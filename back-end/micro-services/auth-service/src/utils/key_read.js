const fs = require('fs');
const path = require('path');

const privateKey = () => {
    return fs.readFileSync(path.resolve(__dirname, '../../private.key'));
}

module.exports = {privateKey};