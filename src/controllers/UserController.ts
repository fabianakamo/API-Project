import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

const insertData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await UserService.createUser(request.body);
    response.status(200).json({ message: "Sucessooooooooooooo" });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;
  try {
    if (!authorization) {
      throw new Error("Sem autorização");
      // throw erro 401
    }

    const user = await UserService.getUser(response.locals.email);

    const { password: _, ...loggedProfile } = user;
    return response.status(200).json(loggedProfile);
  } catch (error: any) {
    next({ name: error.code, message: error.sqlMessage, status: error.status });
  }
};

export default { insertData, getProfile };
