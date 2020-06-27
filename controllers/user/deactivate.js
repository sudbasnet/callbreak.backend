const User = require('../../models/User');
const customError = require('../../helpers/custom-error');

// GET: http://localhost:xxxxx/user/deactivate
module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            throw customError('User does not exist', '500', null);
        }
        user.active = false;
        const savedUser = await user.save();
        res.status(201).json({ message: savedUser.name + ' has been deactivated, you can request reactivation at any time.' });
    } catch (err) {
        next(err);
    }
}