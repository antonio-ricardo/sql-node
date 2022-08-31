import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next();
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  const { status, message } = getErrorResponse(err);

  return res.status(status).json({message});
};

const getErrorResponse = (err: Error) => {
  switch (err.name) {
    case "ConflictError":
      return { message: err.message, status: 409 };
    case "NotFoundError":
      return { message: err.message, status: 404 };
    default:
      return { message: err.message, status: 500 };
  }
};
