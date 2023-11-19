import { Schema, model } from "mongoose";

const songsSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
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
});

const songsModel = model("Songs", songsSchema);
export default songsModel;
