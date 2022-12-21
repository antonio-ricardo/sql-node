import {
  CreateUserDto,
  BaseDto,
  UpdateUserDto,
  authenticateUserDto,
  refreshTokenDto,
} from './../dto';
import { Router } from 'express';
import userControllers from '../controllers/user';
import { validateRequest } from '../middlewares/validateRequest';
import { validateToken } from '../middlewares/validateToken';

const routes = Router();

routes.post(
  '/',
  (req, res, next) => validateRequest(req, res, next, CreateUserDto),
  userControllers.createUser
);

routes.get(
  '/',
  (req, res, next) => validateToken(req, res, next),
  (req, res, next) => validateRequest(req, res, next, BaseDto),
  userControllers.getUser
);

routes.delete(
  '/',
  (req, res, next) => validateToken(req, res, next),
  (req, res, next) => validateRequest(req, res, next, BaseDto),
  userControllers.deleteUser
);

routes.put(
  '/',
  (req, res, next) => validateToken(req, res, next),
  (req, res, next) => validateRequest(req, res, next, UpdateUserDto),
  userControllers.updateUser
);

routes.post(
  '/login',
  (req, res, next) => validateRequest(req, res, next, authenticateUserDto),
  userControllers.authenticateUser
);

routes.post(
  '/refresh',
  (req, res, next) => validateRequest(req, res, next, refreshTokenDto),
  userControllers.refreshToken
);

export default routes;
