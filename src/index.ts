import { Inject } from 'typescript-ioc';
import { HttpServer } from './http/httpServer';
//import { RedisService } from './services/redisService';
import { KnexService } from './services/knexService';

class App {
  @Inject private httpServer!: HttpServer;
  //@Inject private redisService!: RedisService;
  @Inject private knexService!: KnexService;

  async start() {
    await this.httpServer.start();
  }

  async shutdown() {
    await this.httpServer.shutdown();
    //await this.redisService.close();
    await this.knexService.close();
  }
}

export { App };
