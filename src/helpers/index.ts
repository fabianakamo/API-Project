// import crypto from "crypto";
import * as bcrypt from "bcrypt";
import { UserType } from "../services/UserService";

const cryptoPassword = async (password: string) => {
  const salt = 10;
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword;
};

const verifyingPassword = async (password: string, encPassword: string) => {
  const veryfiedPassword = await bcrypt.compare(password, encPassword);
  return veryfiedPassword;
};

// crypto password
// const cryptoPassword = async (password: string) => {
//   const data = {
//     algorithm: "aes-256-cbc",
//     key: crypto.randomBytes(32),
//     iv: crypto.randomBytes(16),
//   };
//   const cipher = crypto.createCipheriv(data.algorithm, data.key, data.iv);
//   let encrypted = cipher.update(password);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   let encryptedPassword = encrypted.toString("hex");
//   return encryptedPassword;
// };

export default { cryptoPassword, verifyingPassword };
