/* tslint:disable */
{{#if canImportByAlias}}
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
{{else}}
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from '../../../src';
{{/if}}
    {{#if iocModule}}
    import { iocContainer } from '{{iocModule}}';
    {{/if}}
        {{#each controllers}}
        import { {{name}} } from '{{modulePath}}';
        {{/each}}
            {{#if authenticationModule}}
            import { authenticateMiddleware } from '{{authenticationModule}}';
            {{/if}}

                const models: TsoaRoute.Models = {
                {{#each models}}
                "{{@key}}": {
                    {{#if enums}}
                    "enums": {{{json enums}}},
                    {{/if}}
                        {{#if properties}}
                        "properties": {
                            {{#each properties}}
                            "{{@key}}": {{{json this}}},
                            {{/each}}
                            },
                                {{/if}}
                                    {{#if additionalProperties}}
                                    "additionalProperties": {{{json additionalProperties}}},
                                    {{/if}}
                                    },
                                        {{/each}}
                                        };

                                            export function RegisterRoutes(app: any) {
                                                {{#each controllers}}
                                                {{#each actions}}
                                                app.{{method}}('{{../../basePath}}{{../path}}{{path}}',
                                                    {{#if security.length}}
                                                authenticateMiddleware({{json security}}),
                                                {{/if}}
                                                    function (request: any, response: any, next: any) {
                                                        const args = {
                                                        {{#each parameters}}
                                                        {{@key}}: {{{json this}}},
                                                        {{/each}}
                                                        };

                                                            let validatedArgs: any[] = [];
                                                            try {
                                                                validatedArgs = getValidatedArgs(args, request);
                                                            } catch (err) {
                                                                return next(err);
                                                            }

                                                            {{#if ../../iocModule}}
                                                            const controller = iocContainer.get<{{../name}}>({{../name}});
                                                {{else}}
                                                const controller = new {{../name}}();
                                                    {{/if}}


                                                        const promise = controller.{{name}}.apply(controller, validatedArgs as any);
                                                        promiseHandler(controller, promise, response, next);
                                                    });
                                                if ('{{../../basePath}}{{../path}}{{path}}'.includes('_')) {
                                                app.{{method}}('{{../../basePath}}{{../path}}{{path}}'.replace('_', '-'),
                                                        {{#if security.length}}
                                                    authenticateMiddleware({{json security}}),
                                                    {{/if}}
                                                        function (request: any, response: any, next: any) {
                                                            const args = {
                                                            {{#each parameters}}
                                                            {{@key}}: {{{json this}}},
                                                            {{/each}}
                                                            };

                                                                let validatedArgs: any[] = [];
                                                                try {
                                                                    validatedArgs = getValidatedArgs(args, request);
                                                                } catch (err) {
                                                                    return next(err);
                                                                }

                                                                {{#if ../../iocModule}}
                                                                const controller = iocContainer.get<{{../name}}>({{../name}});
                                                    {{else}}
                                                    const controller = new {{../name}}();
                                                        {{/if}}


                                                            const promise = controller.{{name}}.apply(controller, validatedArgs as any);
                                                            promiseHandler(controller, promise, response, next);
                                                        });
                                                }
{{/each}}
    {{/each}}

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
