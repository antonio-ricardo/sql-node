import { compare } from 'bcrypt';
import { BadRequestError } from '../../common/errors/badRequest';
import { makeTokensWithEmail } from '../../helpers/makeTokensWithEmail';
import { prisma } from './../../database/connection';

interface Input {
  email: string;
  password: string;
}

export const authenticateUserService = async (input: Input) => {
  const user = await prisma.user.findFirst({
    where: {
      email: input.email,
    },
  });

  if (!user) {
    throw new BadRequestError('Invalid email or password');
  }

  const passwordIsValid = await compare(input.password, user.password);

  if (!passwordIsValid) {
    throw new BadRequestError('Invalid email or password');
  }

  const { refreshToken, acessToken } = await makeTokensWithEmail(user.email);

  return { refreshToken, acessToken };
};
