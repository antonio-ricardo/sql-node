import { prisma } from "./../../database/connection";
import { CreateUserDto } from "../../dto";
import { NotFoundError } from "../../common/errors";

export const updateUserService = async (input: CreateUserDto) => {
  const user = await prisma.user.update({
    where: {
      email: input.email,
    },
    data: {
      name: input.name,
    },
  });

  if (!user) {
    throw new NotFoundError("Not find any user with sent email");
  }

  return user;
};
