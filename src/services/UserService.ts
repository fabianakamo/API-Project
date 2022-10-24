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
    const insert = UserRepository.writeData({
      name,
      email,
      password: cryptedPassword,
    });
  } catch (error) {
    throw error;
  }
};

export default { createUser };
