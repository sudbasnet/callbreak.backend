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

router.get('/:userId/request_verification_email', requestVerificationEmail);

router.get('/:userId/verify/:verification_code', verifyEmail);

router.post('/request_password_reset', requestPasswordReset);

router.get('/:userId/password_reset/:reset_code', (req, res, next) => { }); /// requires frontend to configure

router.post('/:userId/password_reset/:reset_code', resetPassword);

// routes that require authentication
router.get('/deactivate', isUserAuthenticated, userDeactivation);

router.get('/delete_account', isUserAuthenticated, userDeletion);

// EXPORT
module.exports = router;