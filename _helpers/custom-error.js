module.exports = (message, status, details) => {
    const error = new Error(message);
    error.status = status;
    error.details = details;
    return error;
}