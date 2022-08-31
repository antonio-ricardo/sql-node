import { CreateUserDto, BaseUserDto } from "./../dto";
import { Router } from "express";
import userControllers from "../controllers/user";
import { validateRequest } from "../middlewares/validateRequest";

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
    validateRequest(req, res, next, BaseUserDto);
  },
  userControllers.deleteUser
);

routes.put(
  "/",
  (req, res, next) => {
    validateRequest(req, res, next, CreateUserDto);
  },
  userControllers.updateUser
);

export default routes;
