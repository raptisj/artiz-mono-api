import { Schema, model } from "mongoose";

const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birth_year: {
    type: Number,
    required: true,
  },
  death_year: {
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
});

const artistModel = model("Artist", artistSchema);
export default artistModel;
