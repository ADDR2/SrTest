/* 3rd party libraries */
const amqp = require('amqplib/callback_api');

/* Local import */
const logger = require("../utils/logger");

module.exports = queue => {
    amqp.connect('amqp://localhost', (err, conn) => {
        conn.createChannel((err, ch) => {

            ch.assertQueue(queue, { durable: false });
            logger.info(`Receiver channel created on ${queue}`);

            ch.consume(queue, message => {
                logger.info(`sms successfully received through ${queue}: ${message.content.toString()}`);
            }, { noAck: true });
        });
    });
};