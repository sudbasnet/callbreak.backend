const router = require('express').Router();

const registrationDataValidation = require('../middlewares/user-registration-validation');

const isUserAuthenticated = require('../middlewares/user-authentication-verification');

const userController = require('./user.controller');

// ROUTES
router.put('/register', registrationDataValidation, userController.userRegistration);

router.post('/login', userController.userLogin);

router.get('/:userId/request-verification-email', userController.requestVerificationEmail);

router.get('/:userId/verify/:verificationCode', userController.verifyEmail);

router.post('/request-password-reset', userController.requestPasswordReset);

router.get('/:userId/password-reset/:resetCode', (req, res, next) => { }); /// requires frontend to configure

router.post('/:userId/password-reset/:resetCode', userController.resetPassword);

// routes that require authentication
router.get('/deactivate', isUserAuthenticated, userController.userDeactivation);

router.get('/delete_account', isUserAuthenticated, userController.userDeletion);

// EXPORT
module.exports = router;