import { Schema, model } from "mongoose";

const artistsSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  birth_year: {
    type: Number,
    required: true,
  },
  instrument: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

const artistsModel = model("Artists", artistsSchema);
export default artistsModel;
