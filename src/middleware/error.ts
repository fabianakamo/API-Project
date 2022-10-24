import { NextFunction, Request, Response } from "express";

const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.locals.status ? res.locals.status : 500;
  const response: any = { [err.name]: err.message };
  if (statusCode === 500) {
    response.stack = err.stack;
  }
  res.status(statusCode).json(response);
};

export default errorHandler;
