const User = require('../../models/User');
const customError = require('../../helpers/custom-error');

// GET: http://localhost:xxxxx/user/delete_account
module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            throw customError('User does not exist', '500', null);
        }
        const name = user.name;
        const result = await User.deleteOne({ _id: req.userId });
        res.status(201).json({ message: name + ' has been deleted, you can register again at a later time if you want to.' });
    } catch (err) {
        next(err);
    }
}