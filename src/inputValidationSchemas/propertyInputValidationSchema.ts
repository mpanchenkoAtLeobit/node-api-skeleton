import Joi from '@hapi/joi';
import { BadInputError } from '../utils/errors';
import { Singleton } from 'typescript-ioc';
import { ERROR_MESSAGES } from '../constants/error';
import { AbstractInputValidationsSchema } from './abstractInputValidationsSchema';

@Singleton
class PropertyInputValidationSchema extends AbstractInputValidationsSchema {
  idSchema(): Joi.Schema {
    return super.getPkSchema().error(new BadInputError(ERROR_MESSAGES.InvalidId));
  }
  textSchema(): Joi.Schema {
    return super.getStringSchema().error(new BadInputError(ERROR_MESSAGES.InvalidText));
  }
}

export { PropertyInputValidationSchema };
