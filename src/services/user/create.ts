import { prisma } from "../../database/connection";
import { ConflictError } from "../../common/errors";
import { CreateUserDto } from "../../dto";

export const createUserService = async (input: CreateUserDto) => {
  const userExists = await prisma.user.findFirst({
    where: {
      email: input.email,
    },
  });

  if (userExists) {
    throw new ConflictError("User already exists");
  }

  const createdUser = await prisma.user.create({
    data: input,
  });

  return createdUser;
};