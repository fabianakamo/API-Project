import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/UserService";

const userLogin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = request.body;
    const verifyEmail = await UserService.getEmail(email);
    const verifyPassword = await UserService.getPassword(password, email);

    response.send(verifyPassword);
  } catch (error) {
    next(error);
  }
};

export default { userLogin };
