const errors = require('./error.constants');

module.exports = function generateErrorResponse(res, errorMessage) {
    let status = errorStatuses[errorMessage];
    if(!status) {
        status = 500;
        errorMessage = errors.SERVER_ERROR;
    }

    return res.status(status)
        .json({ message: errorMessage });
}

const errorStatuses = {};
errorStatuses[errors.RECEIVER_NOT_FOUND] = 404;
errorStatuses[errors.REQUEST_NOT_FOUND] = 404;
errorStatuses[errors.REVIEW_NOT_FOUND] = 404;
errorStatuses[errors.COMMENT_NOT_FOUND] = 404;
errorStatuses[errors.USER_NOT_FOUND] = 404;

errorStatuses[errors.INCORRECT_LOGIN_DATA] = 400;
errorStatuses[errors.INCORRECT_REGISTER_DATA] = 400;
errorStatuses[errors.MISSING_COMMENT_ID] = 400;
errorStatuses[errors.MISSING_LOGIN_DATA] = 400;
errorStatuses[errors.MISSING_REQUEST_ID] = 400;
errorStatuses[errors.MISSING_REVIEW_ID] = 400;
errorStatuses[errors.MISSING_USER_ID] = 400;
errorStatuses[errors.MISSING_USERNAME] = 400;

errorStatuses[errors.USERNAME_CONFLICT] = 409;

errorStatuses[errors.PERMISSIONS_DENIED] = 403;



