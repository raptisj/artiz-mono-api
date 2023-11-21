import express from "express";

import * as userController from "../controllers/user";
import { verifyUser } from "../middleware/verifyUser";

const router = express.Router();

router.post("/users/register", userController.register);
router.post("/users/login", userController.login);
router.get("/users/currentUser", verifyUser, userController.currentUser);

export { router as default };
