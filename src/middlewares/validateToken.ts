import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UnauthorizedError } from '../common/errors/unauthorized';

export const validateToken = (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new UnauthorizedError('Invalid token');
    }

    const [prefix, token] = req.headers.authorization.split(' ');

    if (prefix != 'Bearer') {
      throw new UnauthorizedError('Invalid token');
    }

    const verifiedToken = verify(
      token,
      process.env.PRIVATE_KEY || 'private-toin-key'
    );

    res.locals.email = verifiedToken.sub;

    next();
  } catch (err) {
    throw new UnauthorizedError('Invalid token');
  }
};
