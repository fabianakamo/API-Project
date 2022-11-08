import { UserType } from "../services/UserService";
import knex from "../database";

const writeData = async (user: UserType) => {
  try {
    await knex("users").insert({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } catch (error: any) {
    throw { name: error.code, message: error.sqlMessage, status: 409 };
  }
};

//consertare
const gettingUserByEmail = async (email: string) => {
  console.log(email);
  try {
    const verifyEmail = await knex
      .select()
      .from("users")
      .where({ email })
      .first();

    console.log(verifyEmail);
    return verifyEmail;
  } catch (error: any) {
    throw { name: error.code, message: error.sqlMessage, status: error.status };
  }
};

export default { writeData, gettingUserByEmail };
