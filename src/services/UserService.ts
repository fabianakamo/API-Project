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
  } catch (error: any) {
    throw { name: error.code, message: error.sqlMessage, status: error.status };
  }
};

const getUser = async (email: string) => {
  const getData = await UserRepository.gettingUserByEmail(email);
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
