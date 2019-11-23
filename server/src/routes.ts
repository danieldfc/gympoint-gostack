import { Router } from 'express';

// import Brute from 'express-brute';
// import BruteRedis from 'express-brute-redis';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

import validationUserStore from './app/validators/User/Store';
import validationSessionStore from './app/validators/Session/Store';
import validationStudentStore from './app/validators/Student/Store';
import validationStudentUpdate from './app/validators/Student/Update';
import validationPlanStore from './app/validators/Plan/Store';
import validationPlanUpdate from './app/validators/Plan/Update';

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
routes.put('/students/:id', validationStudentUpdate, StudentController.update);

routes.get('/students/:student_id/checkins', CheckinController.index);
routes.post('/students/:student_id/checkins', CheckinController.store);

routes.get('/students/:student_id/help-orders', HelpOrderController.index);
routes.post('/students/:student_id/help-orders', HelpOrderController.store);

routes.post('/help-orders/:help_order_id/answer', AnswerController.store);

routes.get('/plans', PlanController.index);
routes.post('/plans', validationPlanStore, PlanController.store);
routes.put('/plans/:id', validationPlanUpdate, PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

export default routes;
