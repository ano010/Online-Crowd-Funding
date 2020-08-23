const mysql = require('mysql');

const mysql_connection_pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'payment'
});

module.exports = mysql_connection_pool;