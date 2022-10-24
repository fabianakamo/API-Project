import knex from "../database";
import { UserType } from "../services/UserService";

const writeData = async (user: UserType) => {
  try {
    const verifyEmail = await knex
      .select("email")
      .from("users")
      .where({ email: user.email })
      .first();
    if (verifyEmail) {
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

export default { writeData };
