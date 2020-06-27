const { body } = require('express-validator');

const User = require('../models/User');

const customError = require('../helpers/custom-error');

module.exports =
    [
        body('name').trim().not().isEmpty(),

        body('email')
            .isEmail()
            .withMessage('Please enter a valid email address.')
            .custom((value, { req }) => {
                return User.findOne({ email: value, active: true })
                    .then(user => {
                        if (user) {
                            return Promise.reject('E-mail already in use');
                        }
                    });
            })
            .normalizeEmail(),

        body('password')
            .isLength({ min: 8, max: 1024 }),

        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw customError('Both passwords should match', '401', null);
                } else {
                    return true;
                }
            })
    ];