import express from "express";

import * as userController from "../controllers/user";
import { verifyUser } from "../middleware/verifyUser";

const router = express.Router();

// auth
router.post("/users/register", userController.register);
router.post("/users/login", userController.login);
router.get("/users/currentUser", verifyUser, userController.currentUser);

// me
router.get("/users/me", verifyUser, userController.userProfile);
router.put("/users/me/song", verifyUser, userController.addLikedSongs);
router.put("/users/me/remove_song", verifyUser, userController.removeLikedSongs);

export { router as default };
