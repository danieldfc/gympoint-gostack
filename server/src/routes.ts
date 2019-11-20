import { Router } from 'express';

// import Brute from 'express-brute';
// import BruteRedis from 'express-brute-redis';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

import validationUserStore from './app/validators/User/Store';
import validationSessionStore from './app/validators/Session/Store';
import validationStudentStore from './app/validators/Student/Store';
import validationStudentUpdate from './app/validators/Student/Update';

const routes = Router();

// const bruteStore = new BruteRedis({
//   host: process.env.REDIS_HOST,
//   port: 6379,
// });

// const bruteForce = new Brute(bruteStore);

routes.post('/users', validationUserStore, UserController.store);
routes.post('/sessions',
  // bruteForce.prevent,
  validationSessionStore,
  SessionController.store);

routes.use(authMiddleware);

routes.post('/students', validationStudentStore, StudentController.store);
routes.post('/students/:id', validationStudentUpdate, StudentController.update);

export default routes;
