/* 3rd party libraries */
const amqp = require('amqplib/callback_api');

/* Local import */
const logger = require("../utils/logger");
const { transporter, mailOptions } = require("../utils/mailer");

module.exports = (queue, smsSender, models) => {
    amqp.connect('amqp://localhost', (err, conn) => {
        conn.createChannel((err, ch) => {

            ch.assertQueue(queue, { durable: false });
            logger.info(`Receiver channel created on ${queue}`);

            ch.consume(queue, message => {
                const messageToString = message.content.toString();
                const order = JSON.parse(messageToString);

                logger.info(`Message *${messageToString}* successfully received through ${queue}`);
                transporter.sendMail(
                    {
                        ...mailOptions,
                        to: order.commercialEmail,
                        subject: `Order just arrived!`,
                        text: `Hurry up and send it to ${order.address}. You'll earn ${order["total cost"]}$`
                    },
                    (error, info) => {
                        if (error) logger.error(error);
                        else
                            logger.info(`Email successfully sent to ${order.commercialEmail}: ${info.response}`);
                    }
                );

                models.sms.create({
                    order_id: order.id,
                    address: order.address
                }).then(
                    sms => {
                        smsSender.channel.next().value(order.id);
                    }
                ).catch( error => logger.error(error) );
            }, { noAck: true });
        });
    });
};