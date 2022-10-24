import express from "express";
import UserController from "../controllers/UserController";
import Validation from "../middleware/Validation";

const router = express.Router();

router.post("/", Validation.validationData, UserController.insertData);

export default { router };
