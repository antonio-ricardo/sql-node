import { SuccessNoContentResponse } from "./../common/sucessNoContentResponse";
import { BaseRequest } from "./../common/baseRequest";
import { SuccessResponse } from "./../common/successResponse";
import { Response } from "express";
import {
  createUserService,
  deleteUserService,
  updateUserService,
  getUserService,
} from "../services";
import { BaseUserDto, CreateUserDto } from "../dto";

export default {
  async createUser(req: BaseRequest<CreateUserDto>, res: Response) {
    const createdUser = await createUserService(req.body);

    const { body, status } = SuccessResponse.create(createdUser);

    return res.status(status).json(body);
  },

  async getUser(req: BaseRequest<BaseUserDto>, res: Response) {
    const user = await getUserService(req.body);

    const { body, status } = SuccessResponse.create(user);

    return res.status(status).json(body);
  },

  async deleteUser(req: BaseRequest<BaseUserDto>, res: Response) {
    await deleteUserService(req.body);

    const { body, status } = SuccessNoContentResponse.create();

    return res.status(status).json(body);
  },

  async updateUser(req: BaseRequest<CreateUserDto>, res: Response) {
    const updatedUser = await updateUserService(req.body);

    const { body, status } = SuccessResponse.create(updatedUser);

    return res.status(status).json(body);
  },
};
