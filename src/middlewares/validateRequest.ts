import { NextFunction, Response } from "express";

export const validateRequest = (
  req: any,
  res: Response,
  next: NextFunction,
  dto: any
) => {
  req.body = {
    ...req.body,
    ...req.headers,
    ...req.params,
    ...req.query,
    ...res.locals,
  };

  const validateBody = dto.validate(req.body);
  req.body = validateBody;

  next();
};
