module.exports = {
    userRegistration: require('./use-cases/register'),

    userLogin: require('./use-cases/login'),

    requestVerificationEmail: require('./use-cases/verify-email'),

    requestPasswordReset: require('./use-cases/request-password-reset'),

    resetPassword: require('./use-cases/reset-password'),

    verifyEmail: require('./use-cases/verify-email'),

    userDeactivation: require('./use-cases/deactivate'),

    userDeletion: require('./use-cases/delete-permanently')
}
