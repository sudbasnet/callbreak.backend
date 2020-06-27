const User = require('../../models/User');

const customError = require('../../helpers/custom-error');

// localhost:xxxx/user/{userId}/verify/{verification_code}
module.exports = async (req, res, next) => {
    const userId = req.params.userId;
    const verification_code = req.params.verification_code;
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw customError('User does not exist', 500, null);
        }
        if (user.verification.token === verification_code && user.verification.expires >= Date.now()) {
            user.active = true;
            user.verification.expires = Date.now();
        }
        const savedUser = await user.save();
        res.status(201).json({ message: 'User has been successfully verified. Thanks.' });
    } catch (err) {
        next(err);
    }
}