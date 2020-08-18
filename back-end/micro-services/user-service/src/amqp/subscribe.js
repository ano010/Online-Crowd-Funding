const amqp = require('amqplib/callback_api');

const ON_POST_CREATED = "ON_POST_CREATED";
const POST_DIRECT_EX = "post-direct";

const onPostCreated = cb => {
    amqp.connect("amqp://localhost", function(err, conn) {
        if(err) throw err;

        conn.createChannel(function(err, ch) {
            if(err) throw err;

            ch.assertExchange(POST_DIRECT_EX, "direct", {durable: false});
            ch.assertQueue("", {exclusive: true}, function(err, q) {
                ch.bindQueue(q.queue, POST_DIRECT_EX, ON_POST_CREATED);
                ch.consume(q.queue, function(msg) {
                    cb(msg);
                }, {noAck: true});
            });
        });
    });
};

module.exports = {onPostCreated};