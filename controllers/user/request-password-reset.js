const passwordResetEmail = require('../../helpers/password-reset-email');

module.exports = async (req, res, next) => {
    const userEmail = req.body.email;
    try {
        const sendEmail = await passwordResetEmail(userEmail);
        res.status(201).json({ message: 'You should receive a verification email. Please click on link provided in the email.' })
    } catch (err) {
        next(err);
    }
};
