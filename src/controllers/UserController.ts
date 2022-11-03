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
      throw new Error("Não autorizado");
    }

    const user = await UserService.getUser(response.locals.email);

    const { password: _, ...loggedProfile } = user;
    return response.status(200).json(loggedProfile);
  } catch (error) {
    response.locals.status = 401;
    next(error);
  }
};

export default { insertData, getProfile };
