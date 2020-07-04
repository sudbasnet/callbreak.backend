const User = require('../user.model');

const bcrypt = require('bcryptjs');

const customError = require('../../_helpers/custom-error');

// POST localhost:xxxx/user/{userId}/reset/{reset_code}
module.exports = async (req, res, next) => {
    const userId = req.params.userId;
    const passwordResetToken = req.params.resetCode;
    const newPassword = req.body.password;

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw Error('User does not exist');
        }
        if (user.passwordReset.token === passwordResetToken && user.passwordReset.expires >= Date.now()) {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            const savedUser = await user.save();

            res.status(201).json({ message: 'Password successfully updated. Please log in.' })
        } else {
            throw Error('Validation Failed');
        }
    } catch (err) {
        next(err);
    }
}