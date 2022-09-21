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
  };

  const validateBody = dto.validate(req.body);
  req.body = validateBody;

  next();
};
