require('dotenv').config();

const User = require('../models/User');

const nodemailer = require('nodemailer');

const nodemailerSendgrid = require('nodemailer-sendgrid');

const crypto = require('crypto');

const emailTransporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    }));

module.exports = async (userEmail) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            try {
                if (err) {
                    throw err;
                }
                const token = buffer.toString('hex');

                const user = await User.findOne({ email: userEmail });
                if (!user) {
                    throw Error('User does not exist');
                }

                user.passwordReset = { token: token, expires: Date.now() + 3600000 };
                const savedUser = await user.save();

                sentEmail = await emailTransporter.sendMail({
                    to: savedUser.email,
                    from: 'restapi201@gmail.com',
                    subject: 'Cardgames - Password Reset',
                    html: `<h1>To reset your password, please click on link below</h1>
                    <br>
                    http://localhost:`+ process.env.PORT + `/user/` + savedUser._id + `/password_reset/` + savedUser.passwordReset.token
                });
            } catch (err) {
                throw err;
            }
        });
    } catch (err) {
        throw err;
    }
}