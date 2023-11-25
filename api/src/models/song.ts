import { Schema, model } from "mongoose";

const songsSchema = new Schema({
  artist_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  added_to_playlist_dates: {
    type: [
      {
        song_id: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
});

const songsModel = model("Song", songsSchema);
export default songsModel;
