const passwordResetEmail = require('../../_helpers/password-reset-email');

const customError = require('../../_helpers/custom-error');

module.exports = async (req, res, next) => {
    const userEmail = req.body.email;
    try {
        const sendEmail = await passwordResetEmail(userEmail);
        res.status(201).json({ message: 'You should receive a verification email. Please click on link provided in the email.' })
    } catch (err) {
        next(err);
    }
};
