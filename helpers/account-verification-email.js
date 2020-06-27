require('dotenv').config();

const User = require('../models/User');

const nodemailer = require('nodemailer');

const sendgridTransport = require('nodemailer-sendgrid-transport');

const crypto = require('crypto');

const emailTransporter = nodemailer.createTransport(sendgridTransport({
    auth: { api_key: process.env.SENDGRID_API_KEY }
}));

module.exports = async (userId) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            try {
                if (err) {
                    throw err;
                }
                const token = buffer.toString('hex');

                const user = await User.findById(userId);
                if (user.active === true) {
                    throw Error('User is already verified.');
                }
                user.verification = { token: token, expires: Date.now() + 3600000 };
                const savedUser = await user.save();

                sentEmail = await emailTransporter.sendMail({
                    to: savedUser.email,
                    from: 'restapi201@gmail.com',
                    subject: 'Cardgames Registration',
                    html: `<h1>To complete registration, please click on link below</h1>
                    <br>
                    <a href="http://localhost:3200/user/` + savedUser._id + `/verify/` + savedUser.verification.token + `">VERIFY ACCOUNT</a>`
                });
            } catch (err) {
                throw err;
            }
        });
    } catch (err) {
        throw err;
    }
}