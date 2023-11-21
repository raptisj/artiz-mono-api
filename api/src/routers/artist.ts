import express from "express";

import * as artistController from "../controllers/artist";

const router = express.Router();

router.get("/artists", artistController.getAll);
router.get("/artists/:id", artistController.getSingle);

export { router as default };
