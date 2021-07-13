import Joi from '@hapi/joi';
//import joiDate from '@hapi/joi-date';
import joiDate from '@joi/date';
const JoiExtended = Joi.extend(joiDate);

export abstract class AbstractInputValidationsSchema {
  protected getPkSchema(): Joi.NumberSchema {
    return Joi.number().integer().min(1);
  }

  protected getStringSchema(): Joi.StringSchema {
    return Joi.string().allow('', null);
  }

  protected getBooleanSchema(): Joi.BooleanSchema {
    return Joi.boolean().default(false);
  }

  protected getArrayOfSchema(schema: Joi.Schema): Joi.ArraySchema {
    return Joi.array().items(schema);
  }

  protected getIsoDateSchema(): Joi.DateSchema {
    return Joi.date().iso();
  }

  protected getDateTimeFormatSchema(format: string | string[]): Joi.DateSchema {
    return JoiExtended.date().format(format);
  }

  protected getTimeOnlySchema(): Joi.DateSchema {
    return JoiExtended.date().format('HH:mm:ss');
  }

  protected getGuidv4Schema(): Joi.StringSchema {
    return Joi.string().guid({ version: 'uuidv4' });
  }
}
