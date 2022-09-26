import { prisma } from './../../database/connection';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UnauthorizedError } from '../../common/errors/unauthorized';
import { refreshTokenDto } from '../../dto';
import { makeTokensWithEmail } from '../../helpers/makeTokensWithEmail';

export const refreshUserTokenService = async (input: refreshTokenDto) => {
  try {
    const verifiedToken = verify(
      input.refreshToken,
      process.env.REFRESH_PRIVATE_KEY || 'refresh-toin-key'
    ) as JwtPayload;

    if (
      !verifiedToken.provider ||
      verifiedToken.provider !== 'sql-node-project'
    ) {
      throw new UnauthorizedError('Invalid token');
    }

    const user = await prisma.user.findFirst({
      where: { email: verifiedToken.sub },
    });

    if (!user || user.refreshToken != input.refreshToken) {
      throw new UnauthorizedError('invalid token');
    }

    const { refreshToken, acessToken } = await makeTokensWithEmail(user.email);

    await prisma.user.update({
      where: { email: user.email },
      data: { refreshToken, updated_at: new Date() },
    });

    return { acessToken, refreshToken };
  } catch (err) {
    throw new UnauthorizedError('invalid token');
  }
};
