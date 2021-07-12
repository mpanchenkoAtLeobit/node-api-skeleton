import { Validator } from '../../../validator';
import Joi from '@hapi/joi';
import { IPropertyUpsertData } from '../../../../models/property';
import { PropertyInputValidationSchema } from '../../../../inputValidationSchemas/propertyInputValidationSchema';
import { Inject, Singleton } from 'typescript-ioc';

@Singleton
class PropertysValidator extends Validator {
  @Inject private validationSchema!: PropertyInputValidationSchema;
  validateIdInput(id: number) {
    this.validate(id, this.validationSchema.idSchema().required());
  }

  validateCreateInput(data: IPropertyUpsertData): void {
    this.validate(
      data,
      Joi.object({
        text: this.validationSchema.textSchema().required(),
      }),
    );
  }

  validateUpdateInput(id: number, data: IPropertyUpsertData): void {
    this.validate(
      { id, ...data },
      Joi.object({
        id: this.validationSchema.idSchema().required(),
        text: this.validationSchema.textSchema().required(),
      }),
    );
  }
}

export { PropertysValidator };
