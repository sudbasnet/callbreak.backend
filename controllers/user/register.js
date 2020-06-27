const User = require('../../models/User');

const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const customError = require('../../helpers/custom-error');

module.exports = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        throw customError(message = 'Validation has Failed', status = 422, details = validationErrors.array());
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt
        .genSalt(10).then(salt => {
            bcrypt
                .hash(password, salt).then(hashedPassword => {
                    const newUser = new User({ name: name, email: email, password: hashedPassword });
                    return newUser.save();
                })
                .then(newUser => {
                    res.status(201).json({ message: 'User created, verify email', userId: newUser._id });
                })
                .catch(err => {
                    next(err);
                })
        });
};