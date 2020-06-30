const router = require('express').Router();

const registrationDataValidation = require('../middlewares/user-registration-validation');

const isUserAuthenticated = require('../middlewares/user-authentication-verification');

const userRegistration = require('../controllers/user/register');

const userLogin = require('../controllers/user/login');

const requestVerificationEmail = require('../controllers/user/request-verification-email');

const requestPasswordReset = require('../controllers/user/request-password-reset');

const resetPassword = require('../controllers/user/reset-password');

const verifyEmail = require('../controllers/user/verify-email');

const userDeactivation = require('../controllers/user/deactivate');

const userDeletion = require('../controllers/user/delete-permanently');

// ROUTES
router.put('/register', registrationDataValidation, userRegistration);

router.post('/login', userLogin);

router.get('/:userId/request-verification-email', requestVerificationEmail);

router.get('/:userId/verify/:verificationCode', verifyEmail);

router.post('/request-password-reset', requestPasswordReset);

router.get('/:userId/password-reset/:resetCode', (req, res, next) => { }); /// requires frontend to configure

router.post('/:userId/password-reset/:resetCode', resetPassword);

// routes that require authentication
router.get('/deactivate', isUserAuthenticated, userDeactivation);

router.get('/delete_account', isUserAuthenticated, userDeletion);

// EXPORT
module.exports = router;