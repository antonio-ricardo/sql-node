import { NextFunction, Response } from 'express';

export const validateRequest = (
  req: any,
  res: Response,
  next: NextFunction,
  dto: any
) => {
  req.body = {
    ...req.query,
    ...req.params,
    ...req.headers,
    ...req.body,
    ...res.locals,
  };

  const validateBody = dto.validate(req.body);
  req.body = validateBody;

  next();
};
