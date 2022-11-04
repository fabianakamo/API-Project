import LoginController from "../controllers/LoginController";
import UserController from "../controllers/UserController";
import Validation from "../middleware/Validation";
import { Router } from "express";

const router: Router = Router();

router.post("/", Validation.validationData, UserController.insertData);
router.post("/login", LoginController.userLogin);
router.get("/profile", Validation.validateToken, UserController.getProfile);

export default router;
