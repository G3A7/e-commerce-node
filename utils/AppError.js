// @desc this Class is responsible about Operational errors (errors that i can predict)
class AppError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status= `${statusCode}`.startsWith(4)?'fail':'error';
        this.isOperational= true;
    }
}

module.exports = AppError;