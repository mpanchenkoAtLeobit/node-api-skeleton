import Joi, { ValidationResult } from '@hapi/joi';
import { Container, Singleton } from 'typescript-ioc';
import { Config } from '../../config';
import { UnauthorizedError } from '../utils/errors';
import { ERROR_MESSAGES } from '../constants/error';

@Singleton
class AuthorizationInputValidationSchema {
  private apiKeySchema: Joi.Schema = Joi.string().required();
  private userTokenSchema: Joi.Schema = Joi.string().required();

  getApiKeySchema() {
    return this.apiKeySchema
      .custom((apiKey, helpers) => {
        const config: Config = Container.get(Config);
        // todo: extract key
        const testApiKey = config.api.apiKey;
        const validationResult: ValidationResult = this.apiKeySchema.validate(testApiKey);

        if (validationResult.error) {
          return helpers.error('any.custom', new UnauthorizedError(ERROR_MESSAGES.ApiKeyAuthNotConfigured));
        }

        if (apiKey !== testApiKey) {
          return helpers.error('any.custom', new UnauthorizedError(ERROR_MESSAGES.ApiKeyAuthNotConfigured));
        }

        return apiKey;
      })
      .error(AuthorizationInputValidationSchema.handleError);
  }

  getUserTokenSchema() {
    return this.userTokenSchema
      .custom((token, helpers) => {
        const parts = token.split(' ');
        if (parts.length !== 2) {
          return helpers.error('any.custom', new UnauthorizedError(ERROR_MESSAGES.InvalidToken));
        }

        const [scheme] = parts;

        if (!/^Bearer$/i.test(scheme)) {
          return helpers.error('any.custom', new UnauthorizedError(ERROR_MESSAGES.InvalidToken));
        }
        return true;
      })
      .error(new UnauthorizedError(ERROR_MESSAGES.InvalidToken));
  }

  private static handleError(errors: any[]) {
    errors = errors.filter((error: { local: any }) => error.local instanceof UnauthorizedError);

    return errors.length ? errors[0].local : new UnauthorizedError(ERROR_MESSAGES.InvalidApiKey);
  }
}

export { AuthorizationInputValidationSchema };
