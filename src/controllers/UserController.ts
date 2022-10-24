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
    confirmPassword,
  }: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  } = request.body;
  try {
    // jogar no middleware?
    if (!name || !email || !password || !confirmPassword) {
      return response.status(400).json({
        message:
          "Obrigatório os campos Nome, Email, Senha e Confirmação de Senha. ",
      });
    }
    const validate = UserService.validationData(
      name,
      email,
      password,
      confirmPassword
    );
    response.send(validate);
  } catch (error) {
    // jogar no middleware?
    next(error);
  }
};

export default { insertData };
