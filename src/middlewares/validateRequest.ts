import { NextFunction, Request, Response } from 'express';

export const validateRequest = (
  req: any,
  res: Response,
  next: NextFunction,
  dto: any
) => {
  dto.validate(req);
  next();
};
