import { AbstractCrudController } from './abstractCrudController';
import { IProperty, IPropertyUpsertData } from '../models/property';
import { PropertyResource } from '../resources/propertyResource';
import { Inject, Singleton } from 'typescript-ioc';

@Singleton
class PropertyController extends AbstractCrudController<IProperty, PropertyResource, IPropertyUpsertData> {
  constructor(@Inject propertyResource: PropertyResource) {
    super(__filename, propertyResource);
  }
}

export { PropertyController };
