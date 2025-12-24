import registerController from "../../controllers/v1/auth/register.controller.js";
import loginController from "../../controllers/v1/auth/login.controller.js";
import googleLoginController from "../../controllers/v1/auth/googleLogin.controller.js";
import logoutController from "../../controllers/v1/auth/logout.controller.js";
import { Router } from "express";

const router = Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/google", googleLoginController);
router.post("/logout", logoutController);

export default router;
