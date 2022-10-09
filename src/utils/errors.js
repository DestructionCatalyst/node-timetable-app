const {Sequelize} = require("sequelize");


const LOG_ERRORS = true;

function errorResponse(response, code, messages) {
    response.status(code).send({code: code, messages: messages});
}

function notFound(response) {
    errorResponse(response, 404, ["Object not found"])
}

const handlers = [
    {
        errorType: Sequelize.ValidationError,
        handlerFunction: function (request, response, error) {
            errorResponse(response, 422, error.errors.map(e => e.message));
        }
    }
]

const defaultHandler = function (request, response, error) {
    errorResponse(response, 500, ["Internal server error"]);
}

function handleError(request, response, error) {
    if (LOG_ERRORS){
        console.log(error)
    }
    for (let handler of handlers){
        if (error instanceof handler.errorType){
            handler.handlerFunction(request, response, error);
            return;
        }
    }
    defaultHandler();
}

module.exports.errorResponse = errorResponse;
module.exports.notFound = notFound;
module.exports.handleError = handleError;
