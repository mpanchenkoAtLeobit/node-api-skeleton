/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { PropertyHandler } from './routes/v1/property/propertyHandler';
import { authenticateMiddleware } from './middleware/authentication';

const models: TsoaRoute.Models = {
    "IProperty": {
        "properties": {
            "id": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
            "text": { "dataType": "string", "required": true },
        },
        "additionalProperties": true,
    },
    "IErrorMessage": {
        "properties": {
            "code": { "dataType": "double", "required": true },
            "message": { "dataType": "string", "required": true },
        },
        "additionalProperties": true,
    },
    "IPropertyUpsertData": {
        "properties": {
            "text": { "dataType": "string", "required": true },
        },
        "additionalProperties": true,
    },
};

export function RegisterRoutes(app: any) {
    app.get('/api/v1/menu_badge',
        authenticateMiddleware([{ "jwt": ["KITCHEN", "TRUCK", "ADMIN", "SUPER_ADMIN", "DEBUG", "KITCHEN_STAFF", "MANAGER", "PRODUCT", "MARKETING"] }]),
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PropertyHandler();


            const promise = controller.getList.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    if ('/api/v1/menu_badge'.includes('_')) {
        app.get('/api/v1/menu_badge'.replace('_', '-'),
            authenticateMiddleware([{ "jwt": ["KITCHEN", "TRUCK", "ADMIN", "SUPER_ADMIN", "DEBUG", "KITCHEN_STAFF", "MANAGER", "PRODUCT", "MARKETING"] }]),
            function(request: any, response: any, next: any) {
                const args = {
                };

                let validatedArgs: any[] = [];
                try {
                    validatedArgs = getValidatedArgs(args, request);
                } catch (err) {
                    return next(err);
                }

                const controller = new PropertyHandler();


                const promise = controller.getList.apply(controller, validatedArgs as any);
                promiseHandler(controller, promise, response, next);
            });
    }
    app.get('/api/v1/menu_badge/:id',
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PropertyHandler();


            const promise = controller.get.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    if ('/api/v1/menu_badge/:id'.includes('_')) {
        app.get('/api/v1/menu_badge/:id'.replace('_', '-'),
            function(request: any, response: any, next: any) {
                const args = {
                    id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                };

                let validatedArgs: any[] = [];
                try {
                    validatedArgs = getValidatedArgs(args, request);
                } catch (err) {
                    return next(err);
                }

                const controller = new PropertyHandler();


                const promise = controller.get.apply(controller, validatedArgs as any);
                promiseHandler(controller, promise, response, next);
            });
    }
    app.post('/api/v1/menu_badge',
        authenticateMiddleware([{ "jwt": ["KITCHEN", "TRUCK", "ADMIN", "SUPER_ADMIN", "DEBUG", "PRODUCT", "MARKETING"] }]),
        function(request: any, response: any, next: any) {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "IPropertyUpsertData" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PropertyHandler();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    if ('/api/v1/menu_badge'.includes('_')) {
        app.post('/api/v1/menu_badge'.replace('_', '-'),
            authenticateMiddleware([{ "jwt": ["KITCHEN", "TRUCK", "ADMIN", "SUPER_ADMIN", "DEBUG", "PRODUCT", "MARKETING"] }]),
            function(request: any, response: any, next: any) {
                const args = {
                    body: { "in": "body", "name": "body", "required": true, "ref": "IPropertyUpsertData" },
                };

                let validatedArgs: any[] = [];
                try {
                    validatedArgs = getValidatedArgs(args, request);
                } catch (err) {
                    return next(err);
                }

                const controller = new PropertyHandler();


                const promise = controller.create.apply(controller, validatedArgs as any);
                promiseHandler(controller, promise, response, next);
            });
    }
    app.put('/api/v1/menu_badge/:id',
        authenticateMiddleware([{ "jwt": ["KITCHEN", "TRUCK", "ADMIN", "SUPER_ADMIN", "DEBUG", "PRODUCT", "MARKETING"] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "IPropertyUpsertData" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PropertyHandler();


            const promise = controller.update.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    if ('/api/v1/menu_badge/:id'.includes('_')) {
        app.put('/api/v1/menu_badge/:id'.replace('_', '-'),
            authenticateMiddleware([{ "jwt": ["KITCHEN", "TRUCK", "ADMIN", "SUPER_ADMIN", "DEBUG", "PRODUCT", "MARKETING"] }]),
            function(request: any, response: any, next: any) {
                const args = {
                    id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                    body: { "in": "body", "name": "body", "required": true, "ref": "IPropertyUpsertData" },
                };

                let validatedArgs: any[] = [];
                try {
                    validatedArgs = getValidatedArgs(args, request);
                } catch (err) {
                    return next(err);
                }

                const controller = new PropertyHandler();


                const promise = controller.update.apply(controller, validatedArgs as any);
                promiseHandler(controller, promise, response, next);
            });
    }
    app.delete('/api/v1/menu_badge/:id',
        authenticateMiddleware([{ "jwt": ["KITCHEN", "TRUCK", "ADMIN", "SUPER_ADMIN", "DEBUG"] }]),
        function(request: any, response: any, next: any) {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new PropertyHandler();


            const promise = controller.delete.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    if ('/api/v1/menu_badge/:id'.includes('_')) {
        app.delete('/api/v1/menu_badge/:id'.replace('_', '-'),
            authenticateMiddleware([{ "jwt": ["KITCHEN", "TRUCK", "ADMIN", "SUPER_ADMIN", "DEBUG"] }]),
            function(request: any, response: any, next: any) {
                const args = {
                    id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                };

                let validatedArgs: any[] = [];
                try {
                    validatedArgs = getValidatedArgs(args, request);
                } catch (err) {
                    return next(err);
                }

                const controller = new PropertyHandler();


                const promise = controller.delete.apply(controller, validatedArgs as any);
                promiseHandler(controller, promise, response, next);
            });
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (controllerObj instanceof Controller) {
                    const controller = controllerObj as Controller
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controller.getStatus();
                }

                if (data || data === false) {
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const values = Object.keys(args).map(function(key) {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return request.query[name];
                case 'path':
                    return request.params[name];
                case 'header':
                    return request.header(name);
                case 'body':
                    return request.body;
                case 'body-prop':
                    return request.body[name];
            }
        });

        return values;
    }
}
