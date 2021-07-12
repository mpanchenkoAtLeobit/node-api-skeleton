import { BaseKnexResource } from './baseKnexResource';
import { Inject, Singleton } from 'typescript-ioc';
import { KnexService } from '../services/knexService';
import { tableNames } from '../constants/tableNames';
import { IProperty } from '../models';

@Singleton
class PropertyResource extends BaseKnexResource<IProperty> {
  constructor(@Inject knexService: KnexService) {
    super(__filename, knexService, tableNames.Properties);
  }
}

export { PropertyResource };
