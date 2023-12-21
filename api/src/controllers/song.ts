import { Request, Response } from "express";
import songs from "../models/song";

//@desc Get songs by an array of ids
//@route GET /api/songs
//@access public
const getAllById = async (req: Request, res: Response) => {
  // #swagger.tags = ['Song']
  const songIds = req.query.song_ids as string;
  const songIdsArray = songIds.split(",");

  try {
    const results = await songs.find({ _id: songIdsArray });

    res.status(200).json({ songs: results });
  } catch (e) {
    console.log(e);
  }
};

//@desc Get single song
//@route GET /api/songs/:id
//@access public
const getSingle = async (req: Request, res: Response) => {
  // #swagger.tags = ['Song']
  const id = req.params.id;

  try {
    const song = await songs.findOne({ _id: id });

    res.status(200).json(song);
  } catch (e) {
    console.log(e);
  }
};

export { getAllById, getSingle };
