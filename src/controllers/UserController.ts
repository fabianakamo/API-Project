import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

const insertData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = request.body;
  try {
    // jogar no middleware?
    if (!name || !email || !password) {
      return response
        .status(400)
        .json({ message: "Obrigatório os campos Nome, Email e Senha." });
    }
    const result = UserService.validation(name, email, password);
    response.send(result);
  } catch (error) {
    // jogar no middleware?
    next(error);
  }
};

export default { insertData };
