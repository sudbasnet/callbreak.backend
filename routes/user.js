const router = require('express').Router();

const registrationDataValidation = require('../middlewares/user-registration-validation');

const userRegistration = require('../controllers/user/register');

const userLogin = require('../controllers/user/login');

router.put('/register', registrationDataValidation, userRegistration);

router.post('/login', userLogin);

module.exports = router;