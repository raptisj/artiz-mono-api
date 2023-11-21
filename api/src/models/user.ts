import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a user name"],
    },
    email: {
      type: String,
      required: [true, "Please add a user email"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add a user password"],
    },
    liked_songs: [String],
    following: [String],
  },
  {
    timestamps: true,
  }
);

const userModel = model("User", userSchema);
export default userModel;
