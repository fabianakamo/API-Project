import knex from "../database";
import { UserType } from "../services/UserService";

const writeData = async (user: UserType) => {
  try {
    const checkEmail = await gettingData(user.email);
    if (checkEmail) {
      throw new Error("Email já existe");
    }

    await knex("users").insert({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    throw error;
  }
};

const gettingData = async (email: string) => {
  const verifyEmail = await knex
    .select()
    .from("users")
    .where({ email })
    .first();

  return verifyEmail;
};

export default { writeData, gettingData };
