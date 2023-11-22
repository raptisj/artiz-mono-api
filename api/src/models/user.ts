import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Please add a user name"],
    },
    email: {
      type: String,
      set: (value: string) => value.toLowerCase(),
      required: [true, "Please add a user email"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add a user password"],
      validate: {
        validator: (value: string) => value.length >= 8,
        message: "Password is too short",
      },
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
