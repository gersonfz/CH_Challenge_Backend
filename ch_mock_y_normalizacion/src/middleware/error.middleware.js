const { HTTP_STATUS } = require('../constants/api.constants')
const { errorResponse } = require('../utils/api.utils')

const errorMiddleware = (error, req, res, next) => {
    const status = error.status || HTTP_STATUS.INTERNAL_ERROR;
    const message = error.message || 'An unexpected error ocurred'; 

    return res.status(status).json(errorResponse(message))
}

module.exports = errorMiddleware