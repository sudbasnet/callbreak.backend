const User = require('../../models/User');

const customError = require('../../helpers/custom-error');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const inactiveUser = await User.findOne({ email: req.body.email, active: false });
        if (inactiveUser) {
            throw customError('Please verify email', 401, null);
        }
        const user = await User.findOne({ email: req.body.email, active: true });
        if (!user) {
            throw customError('Email or password is incorrect.', 401, null);
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            throw customError('Email or password is incorrect.', 401, null);
        }
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
        res.status(200).json({ _id: user._id, name: user.name, email: user.email, token: token });
    }
    catch (err) {
        next(err);
    }
}