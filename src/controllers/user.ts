import { BaseRequest } from "./../common/baseRequest";
import { SuccessResponse } from "./../common/successResponse";
import { Response } from "express";
import { createUserDto } from "../dto/createUser";
import userService from "../services/user";

export default {
  async createUser(req: BaseRequest<createUserDto>, res: Response) {
    const createdUser = await userService.createUserService(req);

    const { body, status } = SuccessResponse.create(createdUser);

    return res.status(status).json(body);
  },
};
