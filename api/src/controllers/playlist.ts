import { Response } from "express";
import playlists from "../models/playlist";
import songs from "../models/song";
import { RequestTypeWithUser } from "src/types/user";
import mongoose from "mongoose";
import { getMongooseValidationErrors } from "../utils/errorHandling";
import { durationToSeconds } from "../utils/playlist";
import { setPagination } from "../utils/pagination";

//@desc Get all playlists
//@route GET /api/users/playlists
//@access private
//query params ?size=15&page=2
const getAll = async (req: RequestTypeWithUser, res: Response) => {
  const userId = req.user.id;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.size) || 20;

  try {
    const totalItems = await playlists.find().totalItems();
    const results = await playlists
      .find({ user_id: userId })
      .skip((page - 1) * pageSize) // this approach can have a negative impact on performance when dealing with larger datasets
      .limit(pageSize);

    const pagination = setPagination(page, pageSize, totalItems);

    res.status(200).json({ pagination, playlists: results });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

//@desc Get single playlist with
//@route GET /api/users/playlists/:id
//@access private
const getSingle = async (req: RequestTypeWithUser, res: Response) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const playlist = await playlists.findOne({ _id: id, user_id: userId });
    const playlistSongs = await songs.find({ _id: playlist.song_ids });

    res.status(200).json({ playlist, songs: playlistSongs });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

//@desc Create playlist
//@route POST /api/users/playlists
//@access private
const createPlaylist = async (req: RequestTypeWithUser, res: Response) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const playlist = await playlists.create({
      user_id: userId,
      title,
      description,
      song_ids: [],
      song_count: 0,
      total_track_duration_in_seconds: 0,
    });

    res.status(201).json({ _id: playlist._id });
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = getMongooseValidationErrors(error);

      res.status(404).json({ errors: validationErrors });
    }

    res.status(400).json({ message: "Something went wrong!" });
  }
};

//@desc Update playlist by adding a song
//@route PUT /api/users/playlists/:id/add
//@access private
const addSongToPlaylist = async (req: RequestTypeWithUser, res: Response) => {
  const { song_id } = req.body;
  const userId = req.user.id;
  const id = req.params.id;

  try {
    const playlist = await playlists.findOne({ _id: id, user_id: userId });
    const song = await songs.findOne({ _id: song_id });
    const existsInPlaylist = playlist.existsInPlaylist(song_id);

    if (!existsInPlaylist) {
      const updatedPlaylist = await playlists.updateOne(
        { _id: id, user_id: userId },
        {
          $push: { song_ids: song_id },
          $inc: {
            song_count: 1,
            total_track_duration_in_seconds: durationToSeconds(song.duration),
          },
        },
        { new: true }
      );

      res.status(200).json(updatedPlaylist);
    } else {
      res.status(400).json({ message: "Song is already in playlist" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

//@desc Update playlist by removing a song
//@route PUT /api/users/playlists/:id/remove
//@access private
const removeSongToPlaylist = async (
  req: RequestTypeWithUser,
  res: Response
) => {
  const { song_id } = req.body;
  const userId = req.user.id;
  const id = req.params.id;

  try {
    const song = await songs.findOne({ _id: song_id });

    const updatedPlaylist = await playlists.updateOne(
      { _id: id, user_id: userId },
      {
        $pull: { song_ids: song_id },
        $inc: {
          song_count: -1,
          total_track_duration_in_seconds: -durationToSeconds(song.duration),
        },
      },
      { new: true }
    );

    res.json(updatedPlaylist);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

//@desc Update playlist detail such as title and description
//@route PUT /api/users/playlists/:id/details
//@access private
const updatePlaylistDetails = async (
  req: RequestTypeWithUser,
  res: Response
) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  const id = req.params.id;

  try {
    const playlist = await playlists.findOne({ _id: id, user_id: userId });

    const updatedPlaylist = await playlist.updateOne(
      { _id: id, user_id: userId },
      { title, description }
    );

    res.json(updatedPlaylist);
  } catch (e) {
    console.log(e);
  }
};

//@desc Delete playlist
//@route DELETE /api/users/playlists/:id
//@access private
const deletePlaylist = async (req: RequestTypeWithUser, res: Response) => {
  const id = req.params.id;

  try {
    const deletedPlaylist = await playlists.findByIdAndDelete(id);

    res.status(200).json({ playlist: deletedPlaylist._id });
  } catch (e) {
    console.log(e);
  }
};

export {
  getAll,
  getSingle,
  createPlaylist,
  addSongToPlaylist,
  removeSongToPlaylist,
  updatePlaylistDetails,
  deletePlaylist,
};
