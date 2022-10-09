const { errorResponse, notFound, handleError } = require("../utils/errors");

function method_for(endpoint) {
    if (endpoint.indexOf("_") > 0)
        return endpoint.slice(0, endpoint.indexOf("_"));
    else
        return endpoint
}

function path_for(endpoint) {
    if (endpoint === "get_all" || endpoint === "post")
        return "/"
    else
        return "/:id"
}

function create_handlers(model) {
    const handlers = {
        get_all: async (request, response) => {
            const objects = await model.findAll({raw: true});
            response.send(objects);
        },
        get_one: async (request, response) => {
            const id = parseInt(request.params.id);
            const result = await model.findByPk(id);
            if (!result)
                notFound(response);
            else {
                response.send(result);
            }
        },
        post: async (request, response) => {
            const object = request.body;
            const result = await model.create(object)
                .catch(function (err) {
                    handleError(request, response, err);
                });
            response.status(201).send(result);
        },
        put: async (request, response) => {
            const id = parseInt(request.params.id);
            const object = request.body;
            await model.update(object, { where: {id: id}})
                .then(async function () {
                    const result = await model.findByPk(id);
                    if (!result)
                       notFound(response);
                    else {
                        response.send(result);
                    }
                })
                .catch(function (err) {
                    handleError(request, response, err);
                });
        },
        delete: async (request, response) => {
            const id = parseInt(request.params.id);
            const target = await model.findByPk(id);
            if (!target)
                notFound(response);
            else {
                await target.destroy();
                response.sendStatus(204);
            }
        }
    };
    handlers.patch = handlers.put
    return handlers
}

function simpleCRUDOperations(
    router,
    model,
    endpoints_name,
    parser,
    endpoints=["get_all", "get_one", "post", "put", "patch", "delete"])
{
    // const modelRouter = express.Router();
    const handlers = create_handlers(model)

    for (let endpoint of endpoints){
        const handler = handlers[endpoint];
        if (handler === undefined)
            throw new Error(`Unknown endpoint type ${endpoint}`);
        const method = method_for(endpoint);
        const path = path_for(endpoint);
        router[method](`/${endpoints_name}${path}`, parser, handler);
    }
}

module.exports.simpleCRUDOperations = simpleCRUDOperations