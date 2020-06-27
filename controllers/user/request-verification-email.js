require('dotenv').config();

const accountVerificationEmail = require('../../helpers/account-verification-email');

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
