import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AppointmentController from './app/controllers/AppointmentController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middleware/auth';

const routes = Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/available', AvailableController.index);

routes.post('/appointments', AppointmentController.store);

routes.get('/appointments', AppointmentController.index);

routes.delete('/appointments/:id', AppointmentController.delete);

export default routes;
