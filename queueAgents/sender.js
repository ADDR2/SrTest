/* 3rd party libraries */
const amqp = require('amqplib/callback_api');

/* Local import */
const logger = require("../utils/logger");

module.exports = queue => {

    function *channelGenerator(){
        let channel = null;
        let error = null;

        yield (err, ch) => {
            channel = ch;
            error = err;

            ch.assertQueue(queue, { durable: false });
            logger.info(`Sender channel created on ${queue}`);
        };

        while(true){
            yield message => {
                channel.sendToQueue(queue, new Buffer(message));
                logger.info(`Message *${message}* successfully sent through ${queue}`);
            };
        }
    }

    const channel = channelGenerator();

    function *connectionGenerator() {
        let connection = null;
        let error = null;

        yield (err, conn) => {
            connection = conn;
            error = err;

            conn.createChannel(channel.next().value);
            logger.info(`Connection created to ${queue}`);
        };

        connection.close();
        yield logger.info("Connection successfully closed");
    }

    const connection = connectionGenerator();

    amqp.connect('amqp://localhost', connection.next().value);

    return {
        connection,
        channel
    };
};