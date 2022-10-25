import express from "express";
import UserController from "../controllers/UserController";
import Validation from "../middleware/Validation";
import LoginController from "../controllers/LoginController";

const router = express.Router();

router.post("/", Validation.validationData, UserController.insertData);
router.post("/login", LoginController.userLogin);

export default { router };
