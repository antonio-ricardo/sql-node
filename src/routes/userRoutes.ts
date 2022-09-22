import {
  CreateUserDto,
  BaseUserDto,
  UpdateUserDto,
  LogUserDto,
} from "./../dto";
import { Router } from "express";
import userControllers from "../controllers/user";
import { validateRequest } from "../middlewares/validateRequest";
import { validateToken } from "../middlewares/validateToken";

const routes = Router();

routes.post(
  "/",
  (req, res, next) => {
    validateRequest(req, res, next, CreateUserDto);
  },
  userControllers.createUser
);

routes.get(
  "/",
  (req, res, next) => {
    validateRequest(req, res, next, BaseUserDto);
  },
  userControllers.getUser
);

routes.delete(
  "/",
  (req, res, next) => {
    validateToken(req, res, next);
  },
  (req, res, next) => {
    validateRequest(req, res, next, BaseUserDto);
  },
  userControllers.deleteUser
);

routes.put(
  "/",
  (req, res, next) => {
    validateToken(req, res, next);
  },
  (req, res, next) => {
    validateRequest(req, res, next, UpdateUserDto);
  },
  userControllers.updateUser
);

routes.post(
  "/login",
  (req, res, next) => {
    validateRequest(req, res, next, LogUserDto);
  },
  userControllers.logUser
);

export default routes;
