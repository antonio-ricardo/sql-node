import { prisma } from '../../database/connection';
import { ConflictError } from '../../common/errors';
import { CreateUserDto } from '../../dto';
import { hash } from 'bcrypt';
import { makeTokensWithEmail } from '../../helpers/makeTokensWithEmail';

export const createUserService = async (input: CreateUserDto) => {
  const userExists = await prisma.user.findFirst({
    where: {
      email: input.email,
    },
  });

  if (userExists) {
    throw new ConflictError('User already exists');
  }

  const hashedPassword = await hash(input.password, 10);

  const { acessToken, refreshToken } = await makeTokensWithEmail(input.email);

  const createdUser = await prisma.user.create({
    data: { ...input, password: hashedPassword, refreshToken },
  });

  return { ...createdUser, acessToken };
};
