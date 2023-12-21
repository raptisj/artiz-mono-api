import { Request, Response } from "express";
import artists from "../models/artist";
import songs from "../models/song";
import { setPagination } from "../utils/pagination";

//@desc Get all artists
//@route GET /api/artists
//@access public
//query params ?size=15&page=2
const getAll = async (req: Request, res: Response) => {
  // #swagger.tags = ['Artist']
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.size) || 20;

  try {
    const totalItems = await artists.find().totalItems();
    const results = await artists
      .find({})
      .skip((page - 1) * pageSize) // this approach can have a negative impact on performance when dealing with larger datasets
      .limit(pageSize);

    const pagination = setPagination(page, pageSize, totalItems);

    res.status(200).json({ pagination, artists: results });
  } catch (e) {
    console.log(e);
  }
};

//@desc Get single artist
//@route GET /api/artists/:id
//@access public
const getSingle = async (req: Request, res: Response) => {
  // #swagger.tags = ['Artist']
  const id = req.params.id;

  try {
    const artist = await artists.findOne({ _id: id });
    const artistSongs = await songs.find(
      { artist_id: id },
      { added_to_playlist_dates: 0 }
    );

    res.status(200).json({ artist, songs: artistSongs });
  } catch (e) {
    console.log(e);
  }
};

export { getAll, getSingle };
