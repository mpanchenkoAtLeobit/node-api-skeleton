import { Knex } from 'knex';
import _ from 'lodash';
import { Base } from '../base';
import { KnexService } from '../services/knexService';
import { Columns, IDataProperties } from '../models';
import { ConflictError } from '../utils/errors';
import { ERROR_MESSAGES } from '../constants/error';
import { Inject } from 'typescript-ioc';
import { wrapError, UniqueViolationError } from 'db-errors';

abstract class BaseKnexResource<T> extends Base {
  protected knex: Knex;
  protected tableName: string;
  readonly allColumns: Columns;

  protected constructor(filename: string, @Inject knexService: KnexService, tableName: string) {
    super(filename);

    this.knex = knexService.getClient();
    this.tableName = tableName;
    this.allColumns = `${this.tableName}.*`;
  }

  protected extendFiltering(filters: IDataProperties = {}): IDataProperties {
    return Object.keys(filters).reduce((acc, key) => {
      if (Object.prototype.hasOwnProperty.call(filters, key) && !_.isUndefined(filters[key])) {
        if (!key.includes('.')) {
          acc[`${this.tableName}.${key}`] = filters[key];
        } else {
          acc[key] = filters[key];
        }
      }
      return acc;
    }, {});
  }

  public async create<F>(data: F, trx: Knex = this.knex): Promise<number[]> {
    try {
      return await trx(this.tableName).insert(data).returning('id');
    } catch (e) {
      const wrappedError = wrapError(e);
      if (wrappedError instanceof UniqueViolationError && wrappedError.columns.includes('name')) {
        throw new ConflictError(ERROR_MESSAGES.AlreadyExists);
      }
      throw e;
    }
  }

  public async createAndReturn<F>(
    data: F,
    trx: Knex = this.knex,
    returningColumns: string | string[] = '*',
  ): Promise<T[]> {
    try {
      const value: any = await trx(this.tableName).insert(data).returning(returningColumns);
      return value;
    } catch (e) {
      const wrappedError = wrapError(e);
      if (wrappedError instanceof UniqueViolationError && wrappedError.columns.includes('name')) {
        throw new ConflictError(ERROR_MESSAGES.AlreadyExists);
      }
      throw e;
    }
  }

  public async update<F>(filters: IDataProperties, data: F, trx: Knex = this.knex): Promise<number[]> {
    return await trx(this.tableName).where(this.extendFiltering(filters)).update(data).returning('id');
  }

  public async updateAndReturn<F>(
    filters: IDataProperties,
    data: F,
    trx: Knex = this.knex,
    returningColumns: string | string[] = '*',
  ): Promise<T[]> {
    const value: any = await trx(this.tableName)
      .where(this.extendFiltering(filters))
      .update(data)
      .returning(returningColumns);
    return value;
  }

  public async get(filters: IDataProperties, trx: Knex = this.knex): Promise<T[]> {
    return await trx(this.tableName).select(this.allColumns).where(this.extendFiltering(filters));
  }

  public async getOne(filters: IDataProperties, trx: Knex = this.knex): Promise<T | undefined> {
    return await trx(this.tableName).select(this.allColumns).where(this.extendFiltering(filters)).first();
  }

  public async delete(filters: IDataProperties, trx: Knex = this.knex): Promise<number[]> {
    return await trx(this.tableName).where(this.extendFiltering(filters)).delete().returning('id');
  }
}

export { BaseKnexResource };
