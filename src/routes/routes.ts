import express from "express";
import UserController from "../controllers/UserController";
import Validation from "../middleware/Validation";
import LoginController from "../controllers/LoginController";

const router = express.Router();

router.post("/", Validation.validationData, UserController.insertData);
router.post("/login", LoginController.userLogin);
router.get("/profile", Validation.validateToken, UserController.getProfile);

export default { router };
