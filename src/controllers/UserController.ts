import { NextFunction, Request, Response } from "express";
import validationData from "../middleware/Validation";
import UserService from "../services/UserService";

const insertData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await UserService.createUser(request.body);
    response.status(200).json("Sucessooooooooooooo");
  } catch (error) {
    next(error);
  }
};

export default { insertData };
