import { NextFunction, Request, Response } from "express";

const errorHandler = async (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.status ? err.status : 500;
  const response: any = { status: statusCode, [err.name]: err.message };
  if (statusCode === 500) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
