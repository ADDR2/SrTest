/* 3rd party libraries */
const amqp = require('amqplib/callback_api');

module.exports = (queue, smsSender) => {
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {

            ch.assertQueue(queue, { durable: false });
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
            ch.consume(queue, function(msg) {
                console.log(" [x] Received %s", msg.content.toString());
            }, { noAck: true });
        });
    });
};