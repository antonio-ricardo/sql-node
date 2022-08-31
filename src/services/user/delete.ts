import { NotFoundError } from "../../common/errors";
import { BaseUserDto } from "../../dto";
import { prisma } from "./../../database/connection";

export const deleteUserService = async (input: BaseUserDto) => {
  const deletedUser = await prisma.user.update({
    where: {
      email: input.email,
    },
    data: {
      hasDeleted: true,
    },
  });

  if (!deletedUser) {
    throw new NotFoundError("Not find any user with sent email");
  }
};
