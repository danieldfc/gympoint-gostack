import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import validationUserStore from './app/validators/User/Store';
import validationSessionStore from './app/validators/Session/Store';

const routes = Router();

routes.post('/users', validationUserStore, UserController.store);
routes.post('/sessions', validationSessionStore, SessionController.store);

export default routes;
