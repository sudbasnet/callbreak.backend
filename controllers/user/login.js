const User = require('../../models/User');

const customError = require('../../helpers/custom-error');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw customError('Email or password is incorrect.', 401, null);
        }
        const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrectPassword) {
            throw customError('Email or password is incorrect.', 401, null);
        }
        const jwtToken = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
        res.status(200).json({ _id: user._id, name: user.name, email: user.email, token: jwtToken });
    }
    catch (err) {
        next(err);
    }
}