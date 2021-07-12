import { Request, Response, NextFunction } from 'express';
import { Container } from 'typescript-ioc';
//import { TokenController } from '../../controllers/tokenController';
import { UnauthorizedError } from '../../utils/errors';
import { ERROR_MESSAGES } from '../../constants/error';
import { AuthorizationInputValidationSchema } from '../../inputValidationSchemas/authorizationInputValidationSchema';

export const JWT_HEADER = 'authorization';
export const API_KEY_HEADER = 'x-api-key';
export const USER_ID_HEADER = 'x-user-id';

const securityType = {
  JWT: 'jwt',
  API_KEY: 'api_key',
};

import { log } from '../../services/logService';
import { TsoaRoute } from 'tsoa';
import _ from 'lodash';
import { Config } from '../../../config';

const config: Config = Container.get(Config);

export function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const {
      route: { path },
      method,
    } = request;
    const endpoint = `${method} ${path}`;

    log.debug(`Security config for route ${endpoint}: `, security);

    if (!security.length) {
      log.debug(`No security constraint defined for the route ${endpoint}. Bypassing authentication.`);

      return next();
    }

    if (request.hasOwnProperty('user')) {
      log.debug(`User is already authorized for the route ${endpoint}. Bypassing authentication.`);

      return next();
    }

    if (isRequiredToCheckUserIdHeader(request)) {
      const userId = parseInt(request.get(USER_ID_HEADER) || '', 10);

      if (!isNaN(userId)) {
        request['user'] = { id: userId };
        log.debug(
          `${USER_ID_HEADER} header received for the route ${endpoint}. Bypassing authentication. The header's value is: ${request.get(
            USER_ID_HEADER,
          )}`,
        );

        return next();
      }

      log.error(`Invalid user id passed to ${USER_ID_HEADER} header for the route ${endpoint}.`);
    }

    const authValidationSchema: AuthorizationInputValidationSchema = Container.get(AuthorizationInputValidationSchema);
    const apiKeyHeaderValue: string = request.get(API_KEY_HEADER) || '';
    const jwtAuthHeaderValue: string = request.get(JWT_HEADER) || '';

    try {
      if (isRequiredToCheckAppKey(security, request)) {
        if (isRequiredToCheckJwt(security, request)) {
          [, request.user] = await Promise.all([
            validateAppKey(apiKeyHeaderValue, authValidationSchema),
            validateJwtToken(jwtAuthHeaderValue, authValidationSchema, security[securityType.JWT]),
          ]);

          log.debug(`Client authorized for the route ${endpoint} by ${securityType.API_KEY} and ${securityType.JWT}.`);
          log.debug(`Authorized user is: `, request.user);

          return next();
        }

        await validateAppKey(apiKeyHeaderValue, authValidationSchema);
        log.debug(`Client authorized for the route ${endpoint} by ${securityType.API_KEY}.`);

        return next();
      }

      if (isRequiredToCheckJwt(security, request)) {
        request.user = await validateJwtToken(jwtAuthHeaderValue, authValidationSchema, security[securityType.JWT]);
        log.debug(`Client authorized for the route ${endpoint} by ${securityType.JWT}.`);
        log.debug(`Authorized user is: `, request.user);

        return next();
      }
    } catch (error) {
      log.error(`Authorization failed for the route: ${endpoint}`, {
        error,
        security,
        requestAuthHeaders: _.pick(request.headers, [USER_ID_HEADER, API_KEY_HEADER, JWT_HEADER]),
      });

      return next(error);
    }

    log.error(`Authorization failed for the route: ${endpoint}`);

    return next(new UnauthorizedError(ERROR_MESSAGES.Unauthorized));
  };
}

function isRequiredToCheckAppKey(securityTypes: TsoaRoute.Security[], request: Request) {
  return (
    securityTypes.find((type) => type.hasOwnProperty(securityType.API_KEY)) &&
    request.headers.hasOwnProperty(API_KEY_HEADER)
  );
}

function isRequiredToCheckJwt(securityTypes: TsoaRoute.Security[], request: Request) {
  return (
    securityTypes.find((type) => type.hasOwnProperty(securityType.JWT)) && request.headers.hasOwnProperty(JWT_HEADER)
  );
}

function isRequiredToCheckUserIdHeader(request: Request) {
  return request.get(USER_ID_HEADER) && !request.headers.hasOwnProperty(JWT_HEADER);
}

async function validateJwtToken(
  authHeader: string,
  authSchema: AuthorizationInputValidationSchema,
  permissions?: string[],
) {
  //todo: add validation
  return await true;
}

async function validateAppKey(authHeader: string, authSchema: AuthorizationInputValidationSchema) {
  return await authSchema.getApiKeySchema().validateAsync(authHeader);
}

function extractTokenFromHeader(header: string) {
  const parts = header.split(' ');

  return parts[1];
}
