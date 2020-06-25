const router = require('express').Router();

const jwt = require('jsonwebtoken');

const { registerValidation, tokenValidation } = require('../../controllers/validation');

const bcrypt = require('bcryptjs');

const User = require('../../models/User');


router.post('/register', async (req, res, next) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0]);

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send({ message: 'Email already exists. Please log in.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        dateCreated: new Date()
    });

    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
        // // create token for email verification
        // var token = new Token({ _id: user._id, token: crypto.randomBytes(16).toString('hex'), dateCreated: new Date });
        // console.log(token.token);
    } catch (err) {
        res.status(400).send(err);
    }
});
