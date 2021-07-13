import { Request } from 'express';
//import { Request, Response, NextFunction } from 'express';
//import * as jwt from "jsonwebtoken";
//import { IServiceСonsumer } from '../../models';
import { Container } from 'typescript-ioc';
import { AuthorizationInputValidationSchema } from '../../inputValidationSchemas/authorizationInputValidationSchema';
//import { TokenController } from '../../controllers/tokenController';
/*

import { Config } from 'config';
import { UnauthorizedError } from '../../utils/errors';
import { ERROR_MESSAGES } from '../../constants/error';

import { log } from '../../services/logService';
import { TsoaRoute } from 'tsoa';
export const JWT_HEADER = 'authorization';
const config: Config = Container.get(Config);
*/
export const API_KEY_HEADER = 'x-api-key';
const securityType = {
  JWT: 'jwt',
  API_KEY: 'api_key',
};

export async function expressAuthentication(
  request: Request,
  securityName: string,
  _scopes?: string[],
): Promise<void> {
  if (securityName === securityType.API_KEY) {

    const apiKeyHeaderValue: string = request.get(API_KEY_HEADER) || '';
    const authValidationSchema: AuthorizationInputValidationSchema = Container.get(AuthorizationInputValidationSchema);
    if (apiKeyHeaderValue) {
      await validateAppKey(apiKeyHeaderValue, authValidationSchema);
      return;
    }
    return Promise.reject({});
  }
  return Promise.reject({});
}

async function validateAppKey(authHeader: string, authSchema: AuthorizationInputValidationSchema) {
  return await authSchema.getApiKeySchema().validateAsync(authHeader);
}
