import { sign } from 'jsonwebtoken';

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

  return { acessToken, refreshToken };
};
