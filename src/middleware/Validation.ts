import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

type JwtPayload = {
  email: string;
};

const regexName = new RegExp(/^([a-zA-Z]+([ ]?[a-zA-Z]+)*)$/);
const regexPasswords = new RegExp(
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
);

const validationData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const userSchema = yup.object().shape({
      name: yup
        .string()
        .required()
        .matches(regexName, "Name must contain only letters"),
      email: yup.string().email().required("Not a valid email address"),
      password: yup
        .string()
        .required("Please enter your password")
        .matches(
          regexPasswords,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        ),
      confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password"), null], "Passwords don't match."),
    });

    await userSchema.validate(request.body);

    next();
  } catch (error: any) {
    next({ name: error.name, message: error.message, status: 400 });
    // response.locals.status = 400;
    // if (error.code === "ER_DUP_ENTRY") {
    //   response.locals.status = 409;
    // }
    // OU
    // response.locals.stack = {
    //   [error.name]: error.message,
    //   yup: "Erro na validação do Yup do cadastro",
    // };
  }
};

const validateToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;
  try {
    const token = authorization!.split(" ")[1];

    const { email } = jwt.verify(
      token,
      process.env.JWT_PASSWORD ?? ""
    ) as JwtPayload;

    if (!authorization) {
      throw new Error("Não autorizado");
    }

    response.locals.email = email;

    next();
  } catch (error: any) {
    next({ name: error.name, message: error.message, status: 400 });
  }
};

export default { validationData, validateToken };
