require('dotenv').config();

const User = require('../../models/User');

const nodemailer = require('nodemailer');

const sendgridTransport = require('nodemailer-sendgrid-transport');

const accountVerificationEmail = require('../../helpers/account-verification-email');

const crypto = require('crypto');

const emailTransporter = nodemailer.createTransport(sendgridTransport({
    auth: { api_key: process.env.SENDGRID_API_KEY }
}));

// GET: localhost:xxxx/user/{userId}/request-verification-email
module.exports = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const sendEmail = await accountVerificationEmail(userId);
        res.status(201).json({ message: 'You should receive a verification email. Please click on link provided in the email.' })
    } catch (err) {
        next(err);
    }
};
