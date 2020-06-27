require('dotenv').config();

const User = require('../../models/User');

const nodemailer = require('nodemailer');

const sendgridTransport = require('nodemailer-sendgrid-transport');

const passwordResetEmail = require('../../helpers/password-reset-email');

const crypto = require('crypto');

const emailTransporter = nodemailer.createTransport(sendgridTransport({
    auth: { api_key: process.env.SENDGRID_API_KEY }
}));

module.exports = async (req, res, next) => {
    const userEmail = req.body.email;
    try {
        const sendEmail = await passwordResetEmail(userEmail);
        res.status(201).json({ message: 'You should receive a verification email. Please click on link provided in the email.' })
    } catch (err) {
        next(err);
    }
};
