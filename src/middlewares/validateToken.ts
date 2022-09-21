import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UnathorizedError } from "../common/errors/unathorized";

export const validateToken = (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new UnathorizedError("Invalid token");
    }

    const [_, token] = req.headers.authorization.split(" ");

    const verifiedToken = verify(
      token,
      process.env.PRIVATE_KEY || "private-toin-key"
    );

    res.locals.email = verifiedToken.sub;

    next();
  } catch (err) {
    throw new UnathorizedError("Invalid token");
  }
};
