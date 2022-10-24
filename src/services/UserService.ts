import UserRepository from "../repositories/UserRepository";
import crypto from "crypto";
import * as yup from "yup";

const regexName = new RegExp(/^([a-zA-Z]+([ ]?[a-zA-Z]+)*)$/);
const regexPasswords = new RegExp(
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
);

const validationData = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  let userSchema = yup.object().shape({
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

  // jogar erro no  middleware
  userSchema
    .validate({ name, email, password, confirmPassword })
    .catch(function (err) {
      const erro1 = err.name;
      const erro2 = err.errors;
      // console.log(erro1);
      // console.log(erro2);
    });

  const encryptedPassword = cryptoPassword(password);

  // UserRepository encrypting

  const result = console.log(name, email, encryptedPassword, confirmPassword);
  return;
};

// bcrypt password
const cryptoPassword = async (password: string) => {
  const data = {
    algorithm: "aes-256-cbc",
    key: crypto.randomBytes(32),
    iv: crypto.randomBytes(16),
  };
  const cipher = crypto.createCipheriv(data.algorithm, data.key, data.iv);
  let encrypted = cipher.update(password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  let encryptedPassword = encrypted.toString("hex");
  return encryptedPassword;
};

export default { validationData, cryptoPassword };
