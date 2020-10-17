import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AppointmentController from './app/controllers/AppointmentController';

import authMiddleware from './app/middleware/auth';

const routes = Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/appointments', AppointmentController.store);

routes.get('/appointments', AppointmentController.index);

export default routes;
