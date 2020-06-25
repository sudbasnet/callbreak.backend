const router = require('express').Router();

const jwt = require('jsonwebtoken');

const { registerValidation, tokenValidation } = require('../../controllers/validation');

const bcrypt = require('bcryptjs');

const User = require('../../models/User');

router.post('/register', async (req, res) => {
    // check the general validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0]);

    // check if the user is already in the database
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send({ message: 'Email already exists. Please log in.' });

    // so everything is fine, now we can add the user and password
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


router.post('/login', async (req, res) => {
    // check the login validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0]);

    // check if the email is correct
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: 'Email or the password is not correct.' });

    // // check if the user is verified
    // if (!user.active) return res.status(400).send({ message: 'User has not been verified.' });

    // check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ message: 'Email or the password is not correct.' })

    // Create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({ _id: user._id, name: user.name, email: user.email, token: token });
});

module.exports = router;