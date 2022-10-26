import UserRepository from "../repositories/UserRepository";
import helper from "../helpers";

export type UserType = {
  name: string;
  email: string;
  password: string;
};

const createUser = async ({ name, email, password }: UserType) => {
  try {
    const cryptedPassword = await helper.cryptoPassword(password);
    await UserRepository.writeData({
      name,
      email,
      password: cryptedPassword,
    });
  } catch (error) {
    throw error;
  }
};

const getEmail = async (email: string) => {
  const verifyEmail = await UserRepository.gettingEmail(email);

  if (!verifyEmail) {
    throw new Error("Não existe email cadastrado.");
  }
  return verifyEmail;
};

const getPassword = async (password: string, email: string) => {
  const encPassword = await UserRepository.gettingPassword(email);

  const verifiedPassword = await helper.verifyingPassword(
    password,
    encPassword.password
  );
  return verifiedPassword;
};

export default { createUser, getEmail, getPassword };
