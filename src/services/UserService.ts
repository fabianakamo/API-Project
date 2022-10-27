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

const getUser = async (email: string) => {
  const getData = await UserRepository.gettingData(email);

  if (!getData) {
    throw new Error("Não existe email cadastrado.");
  }
  return getData;
};

const getPassword = async (password: string, encPassword: string) => {
  const verifiedPassword = await helper.verifyingPassword(
    password,
    encPassword
  );

  return verifiedPassword;
};

export default { createUser, getUser, getPassword };
