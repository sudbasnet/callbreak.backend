const jwt = require('jsonwebtoken');

const customError = require('../_helpers/custom-error');

module.exports = (req, res, next) => {
    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader) {
        throw customError('Unauthorized Access', 401, null);
    }
    const token = authorizationHeader.split(' ')[1];
    try {
        const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = verifiedToken.userId;
        next();
    } catch (err) {
        if (!err.status) {
            err.status = 401;
            throw err;
        }
    }
};