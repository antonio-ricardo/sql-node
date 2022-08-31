import { Router } from "express";
import userControllers from "../controllers/user";
import { createUserDto } from "../dto/createUser";
import { validateRequest } from "../middlewares/validateRequest";

const routes = Router();

routes.post(
  "/",
  (req, res, next) => {
    validateRequest(req, res, next, createUserDto);
  },
  userControllers.createUser
);

export default routes;
