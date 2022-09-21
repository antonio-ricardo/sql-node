import { prisma } from "./../../database/connection";
import { UpdateUserDto } from "../../dto";
import { ConflictError, NotFoundError } from "../../common/errors";
import { hash } from "bcrypt";

export const updateUserService = async (input: UpdateUserDto) => {
  if (!input.toUpdate.name && input.toUpdate.hasDeleted == undefined) {
    throw new ConflictError("Any data sent to update the user");
  }

  const userExists = await prisma.user.findFirst({
    where: { email: input.email },
  });

  if (!userExists) {
    throw new NotFoundError("Not find any user with sent email");
  }

  if (input.toUpdate.password) {
    input.toUpdate.password = await hash(input.toUpdate.password, 10);
  }

  const user = await prisma.user.update({
    where: {
      email: input.email,
    },
    data: input.toUpdate,
  });

  return user;
};
