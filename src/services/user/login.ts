import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { BadRequestError } from '../../common/errors/badRequest';
import { prisma } from './../../database/connection';

interface Input {
  email: string;
  password: string;
}

export const userLoginService = async (input: Input) => {
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

  const token = sign({}, process.env.PRIVATE_KEY || 'private-toin-key', {
    subject: user.email,
    expiresIn: 20,
  });

  return { token };
};
