const { required } = require("joi");

const amqp = require('amqplib/callback_api');
const config = require('config');

const USER_SIGNUP = "USER_SIGNUP";

const onSignUp = (msg, cb) => amqp.connect(`amqp://${config.get("rabbitHost")}`, function (err, conn) {
    if(err) {
        throw err;
    }

    conn.createChannel(function(err, ch) {
        if(err){
            throw err;
        }

        ch.assertExchange(USER_SIGNUP, "fanout", {durable: false});
        ch.publish(USER_SIGNUP, '', Buffer.from(JSON.stringify(msg)));
    });

    setTimeout(function(params) {
        conn.close();
    }, 2000);
});

module.exports = {onSignUp};