const jwt = require('jsonwebtoken');

const joi = require('@hapi/joi');

exports.tokenValidation = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401)
        .send('You do not have the necessary access to perform the action.');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

exports.registerValidation = (userData) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });
    return schema.validate(userData);
};
