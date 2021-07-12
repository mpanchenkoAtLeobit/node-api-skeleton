import { Knex } from 'knex';
import { BaseKnexResource } from './baseKnexResource';
import { KnexService } from '../services/knexService';
import { IDataProperties } from '../models';

abstract class BaseSoftKnexResource<T> extends BaseKnexResource<T> {
  protected constructor(filename: string, knexService: KnexService, tableName: string) {
    super(filename, knexService, tableName);
  }

  async delete(filters: IDataProperties, trx: Knex = this.knex): Promise<number[]> {
    return super.update(filters, { deleted_at: new Date() }, trx);
  }

  protected extendFiltering(filters: IDataProperties): IDataProperties {
    const cleanedFilters = super.extendFiltering(filters);
    return Object.assign({}, cleanedFilters, { deleted_at: null });
  }

  async getEvenDeleted(filters: IDataProperties, trx: Knex = this.knex): Promise<T[]> {
    return await trx(this.tableName).select(this.allColumns).where(filters);
  }

  async getOneEvenDeleted(filters: IDataProperties, trx: Knex = this.knex): Promise<T | undefined> {
    return await trx(this.tableName).select(this.allColumns).where(filters).first();
  }
}

export { BaseSoftKnexResource };
