import { sign } from 'jsonwebtoken';
import { prisma } from './../database/connection';

export const makeTokensWithEmail = async (email: string) => {
  const acessToken = sign({}, process.env.PRIVATE_KEY || 'private-toin-key', {
    subject: email,
    expiresIn: '1h',
  });

  const refreshToken = sign(
    { provider: 'sql-node-project' },
    process.env.REFRESH_PRIVATE_KEY || 'refresh-toin-key',
    {
      subject: email,
      expiresIn: '1d',
    }
  );

  await prisma.user.update({
    where: { email: email },
    data: { refreshToken, updated_at: new Date() },
  });

  return { acessToken, refreshToken };
};
