import { createUserDto } from "./../dto/createUser";
import { BaseRequest } from "./../common/baseRequest";
import { prisma } from "./../database/connection";
import { ConflictError } from "../common/errors/conflictError";

export default {
  async createUserService(req: BaseRequest<createUserDto>) {
    const userExists = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    
    if (userExists) {
      throw new ConflictError("User already exists");
    }

    const createdUser = await prisma.user.create({
      data: { email: req.body.email, name: req.body.name },
    });

    return createdUser;
  },
};
