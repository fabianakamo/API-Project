import { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import UserService from "../services/UserService";

const userLogin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = request.body;
    const user = await UserService.getUser(email);
    const verifyPassword = await UserService.getPassword(
      password,
      user.password
    );

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASSWORD ?? "", {
      expiresIn: "8h",
    });

    const { password: _, ...userLogin } = user;

    response.status(200).json({ user: userLogin, token: token });
  } catch (error) {
    next(error);
  }
};

export default { userLogin };
