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
    const result = await UserService.getEmail(email);

    // comparar senha
    //const vefiryPassword = crypto.Verify
    // }
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export default { userLogin };
