import './bootstrap';

import express, {
  ErrorRequestHandler, Request, Response, NextFunction, Application, json,
} from 'express';
import cors from 'cors';
import Youch from 'youch';
import morgan from 'morgan';
import helmet from 'helmet';
// import redis from 'redis';
// import RateLimit from 'express-rate-limit';
// import RateLimitRedis from 'rate-limit-redis';

import routes from './routes';

import './database';

class App {
  public server: Application;

  public constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares(): void {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(json());
    this.server.use(morgan('dev'));

    // this.server.use(new RateLimit({
    //   store: RateLimitRedis({
    //     client: redis.createClient({
    //       host: process.env.REDIS_HOST,
    //       port: 6379 || process.env.REDIS_PORT,
    //     }),
    //   }),
    // }));
  }

  private routes(): void {
    this.server.use(routes);
  }

  private exceptionHandler(): void {
    this.server.use(async (
      err: ErrorRequestHandler,
      req: Request,
      res: Response, next: NextFunction,
    ) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error.' });
    });
  }
}

export default new App().server;
