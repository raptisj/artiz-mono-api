import { Schema, model } from "mongoose";

const artistsSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
});

const artistsModel = model("Artists", artistsSchema);
export default artistsModel;
