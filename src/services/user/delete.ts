import { NotFoundError } from '../../common/errors';
import { BaseDto } from '../../dto';
import { prisma } from './../../database/connection';

export const deleteUserService = async (input: BaseDto) => {
  const deletedUser = await prisma.user.update({
    where: {
      email: input.email,
    },
    data: {
      hasDeleted: true,
      updated_at: new Date(),
    },
  });

  if (!deletedUser) {
    throw new NotFoundError('Not find any user with sent email');
  }
};
