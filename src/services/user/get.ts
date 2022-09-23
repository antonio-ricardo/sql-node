import { prisma } from './../../database/connection';
import { BaseDto } from '../../dto';
import { NotFoundError } from '../../common/errors';

export const getUserService = async (input: BaseDto) => {
  const user = await prisma.user.findFirst({
    where: {
      email: input.email,
    },
  });

  if (!user) {
    throw new NotFoundError('Not find any user with sent email');
  }

  return user;
};
