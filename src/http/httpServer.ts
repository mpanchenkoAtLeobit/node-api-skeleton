import express, { Express } from 'express';
import cors from 'cors';
import { Server } from 'http';
import { Base } from '../base';
import bodyParser from 'body-parser';
import { Config } from '../../config';
import { handleError } from './middleware/handleError';
import { Inject, Singleton } from 'typescript-ioc';
import swaggerUI from 'swagger-ui-express';
// eslint-disable-line 
import swaggerJSON from '../../tsoa/swagger.json';
import { KnexService } from '../services/knexService';
//import { RedisService } from '../services/redisService';
import { ConfigUtils } from '../../config/utils';
/* tslint:disable */
import './routes/v1/property/propertyHandler';
import { RegisterRoutes } from './routes';

/* tslint:enable */

@Singleton
class HttpServer extends Base {
  private router: Express;
  private server?: Server;
  readonly port: number;

  constructor(@Inject config: Config, @Inject knexService: KnexService, /*@Inject redisService: RedisService*/) {
    super(__filename);

    this.router = express();
    this.port = config.httpServer.port;

    this.router.use(cors(config.cors));

    this.router.use(bodyParser.json());

    RegisterRoutes(this.router);

    // Bind swagger documentation
    // Local only for now until we get the API gateway to lock this behind company firewall
    if (ConfigUtils.getAsString('NODE_ENV', 'local') === 'local') {
      this.router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
    }

    this.router.use('/health', async (_req, res) => {
      try {
        await knexService.ping();
        //await redisService.ping();
        res.send('OK');
      } catch (e) {
        res.status(500).send(e.message);
      }
    });
    this.router.use('/', async (_req, res) => {
      res.send(config.service);
    });
    this.router.use(handleError);
  }

  async start() {
    if (this.server) return;
    this.server = await new Promise((resolve) => {
      const server = this.router.listen(this.port, () => {
        resolve(server);
      });
    });
    this.devConsole.log(`Http server successfully started up on port: ${this.port}`);
  }

  async shutdown() {
    if (!this.server) return;
    await new Promise((resolve) => this.server!.close(resolve));
    delete this.server;
    this.devConsole.log(`Http server gracefully closed`);
  }
}

export { HttpServer };
