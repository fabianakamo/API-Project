import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/UserService";
import * as dotenv from "dotenv";
dotenv.config();

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

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_PASSWORD ?? "",
      {
        expiresIn: "8h",
      }
    );

    const { password: _, ...userLogin } = user;

    response.status(200).json({ user: userLogin, token: token });
  } catch (err: any) {
    response.locals.status = 400;
    if (err === "JsonWebTokenError") {
      response.locals.status = 401;
    }
    next(err);
  }
};

export default { userLogin };
