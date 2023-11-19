import { Request, Response } from "express";
import artists from "../models/artists";
import songs from "../models/songs";

const getAll = async (req: Request, res: Response) => {
  try {
    const results = await artists.find();

    res.status(200).json(results);
  } catch (e) {
    console.log(e);
  }
};

const getSingle = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const artist = await artists.findOne({ _id: id });
    const artistSongs = await songs.find({ artist_id: id });

    res.status(200).json({ artist, artistSongs });
  } catch (e) {
    console.log(e);
  }
};

export { getAll, getSingle };
