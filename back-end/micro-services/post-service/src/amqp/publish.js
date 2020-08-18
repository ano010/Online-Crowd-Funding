const amqp = require('amqplib/callback_api');

const ON_POST_CREATED = "ON_POST_CREATED"

const onPostCreated = msg => {
    amqp.connect("amqp://localhost", function(err, conn) {
        if(err) {
            console.error(err);
        }

        conn.createChannel(function(err, ch) {
            if(err) console.error(err);

            const ex = 'post-direct';

            ch.assertExchange(ex, 'direct', {durable: false});
            ch.publish(ex, ON_POST_CREATED, Buffer.from(JSON.stringify(msg)));
        });

        setTimeout(function() {
            conn.close();
        }, 2000);
    });
};

module.exports = {onPostCreated};