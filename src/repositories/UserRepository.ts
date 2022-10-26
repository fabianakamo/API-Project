import knex from "../database";
import { UserType } from "../services/UserService";

const writeData = async (user: UserType) => {
  try {
    const checkEmail = await gettingEmail(user.email);
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

const gettingEmail = async (email: string) => {
  const verifyEmail = await knex
    .select("email")
    .from("users")
    .where({ email })
    .first();

  return verifyEmail;
};

const gettingPassword = async (email: string) => {
  const verifyPassword = await knex
    .select("password")
    .from("users")
    .where({ email })
    .first();

  return verifyPassword;
};

export default { writeData, gettingEmail, gettingPassword };
