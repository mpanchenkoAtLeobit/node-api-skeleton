import Joi from '@hapi/joi';

abstract class Validator {
  protected validate(data: unknown, schema: Joi.Schema): void {
    const { error } = schema.validate(data, { allowUnknown: true });
    if (error) throw error;
  }
}

export { Validator };
