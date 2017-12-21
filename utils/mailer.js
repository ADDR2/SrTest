/* 3rd party libraries */
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aduarte@teravisiontech.com',
        pass: 'Ad15062017'
    }
});
  
const mailOptions = {
    from: 'aduarte@teravisiontech.com'
};

module.exports = {
    transporter,
    mailOptions
};