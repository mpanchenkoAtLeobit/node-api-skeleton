import { Config, IDbConnection } from '../../config';
import knex, { Knex } from 'knex';
import { Inject, Singleton } from 'typescript-ioc';

@Singleton
class KnexService {
  private knex: Knex;
  private dbConnection: IDbConnection;

  constructor(@Inject config: Config) {
    this.dbConnection = { ...config.db.connection };
    this.knex = knex({
      client: 'pg',
      connection: this.dbConnection,
      pool: { ...config.db.pool },
    });
  }

  getClient(): Knex {
    return this.knex;
  }

  ping(): Promise<void> {
    return this.knex.raw('SELECT 1');
  }

  async close(): Promise<void> {
    await this.knex.destroy();
  }
}

export { KnexService };
