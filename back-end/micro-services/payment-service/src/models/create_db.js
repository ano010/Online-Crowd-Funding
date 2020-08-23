const mysql_connection_pool = require("./connect");
const config = require('config');

const creat_db = `CREATE DATABASE ${config.get('db_name')};`;
const use_db = `USE ${config.get('db_name')};`;
const drop_payments = `DROP TABLE IF EXIST ${config.get('payment')}.payment;`;
const drop_post_payment = `DROP TABLE IF EXIST ${config.get('payment')}.post_payments;`;
const create_payments = `CREATE TABLE payments(
    post_id VARCHAR(30),
    payment_id VARCHAR(30),
    payer_id_paypal VARCHAR(200),
    payer_name VARCHAR(200),
    amount FLOAT,
    donated_time DATETIME,
    PRIMARY KEY(payment_id)
    );`;
const create_post_payments = `CREATE TABLE post_payments(
    user_id VARCHAR(30),
    post_id VARCHAR(30),
    total_amount FLOAT,
    PRIMARY KEY(post_id)
);`;

mysql_connection_pool.query(creat_db, function(err, result){
    if(err) throw err;
    console.log(result);
});

mysql_connection_pool.query(drop_payments, function(err, result) {
    if(err) throw err;
    console.log(result);
});

mysql_connection_pool.query(create_payments, function(err, results) {
    if(err) throw err;
    console.log(results);
});

mysql_connection_pool.query(drop_post_payment, function(err, results) {
    if(err) throw err;
    console.log(results);
});

mysql_connection_pool.query(create_post_payments, function(err, results) {
    if(err) throw err;
    console.log(results);
})