import express from "express";

import * as songController from "../controllers/song";

const router = express.Router();

router.get("/songs", songController.getAllById);
router.get("/songs/:id", songController.getSingle);

export { router as default };
