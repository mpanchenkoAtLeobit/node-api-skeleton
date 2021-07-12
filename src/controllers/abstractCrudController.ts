import { Base } from '../base';
import { BaseKnexResource } from '../resources/baseKnexResource';
import { NotFoundError } from '../utils/errors';
import { ERROR_MESSAGES } from '../constants/error';

export abstract class AbstractCrudController<T, R extends BaseKnexResource<T>, F> extends Base {
  constructor(filename: string, protected resource: R) {
    super(filename);
  }

  async get(id: number): Promise<T | undefined> {
    const result = await this.resource.getOne({ id });
    if (!result) {
      throw new NotFoundError(ERROR_MESSAGES.NotFound);
    }

    return result;
  }

  getList(): Promise<T[] | undefined> {
    return this.resource.get({});
  }

  create(body: F): Promise<T[]> {
    return this.resource.createAndReturn<F>(body);
  }

  async update(id: number, body: F): Promise<T[]> {
    const result = await this.resource.updateAndReturn<F>({ id }, body);
    if (!result.length) {
      throw new NotFoundError(ERROR_MESSAGES.NotFound);
    }

    return result;
  }

  async delete(id: number): Promise<number[]> {
    const result = await this.resource.delete({ id });
    if (!result.length) {
      throw new NotFoundError(ERROR_MESSAGES.NotFound);
    }

    return result;
  }
}
