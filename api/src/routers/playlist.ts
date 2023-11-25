import express from "express";

import * as playlistController from "../controllers/playlist";
import { verifyUser } from "../middleware/verifyUser";

const router = express.Router();

router.get("/users/playlists", verifyUser, playlistController.getAll);
router.get("/users/playlists/:id", verifyUser, playlistController.getSingle);
router.post("/users/playlists", verifyUser, playlistController.createPlaylist);
router.put(
  "/users/playlists/:id/add",
  verifyUser,
  playlistController.addSongToPlaylist
);
router.put(
  "/users/playlists/:id/remove",
  verifyUser,
  playlistController.removeSongToPlaylist
);
router.put(
  "/users/playlists/:id/details",
  verifyUser,
  playlistController.updatePlaylistDetails
);
router.delete(
  "/users/playlists/:id",
  verifyUser,
  playlistController.deletePlaylist
);

export { router as default };
