import express from "express";

import * as artistsController from "../controllers/artists";

const router = express.Router();

router.get("/artists", artistsController.getAll);
router.get("/artists/:id", artistsController.getSingle);

export { router as default };
