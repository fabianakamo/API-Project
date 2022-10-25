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
    console.log(name, email, cryptedPassword);
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
  const verifyEmail = await UserRepository.verifyingEmail(email);
  return verifyEmail;
};

export default { createUser, getEmail };
