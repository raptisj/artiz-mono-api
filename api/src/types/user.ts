import mongoose from "mongoose";

export type UserObject = {
  _id?: mongoose.Types.ObjectId | string;
  username: string;
  email: string;
  liked_songs?: string[];
  following?: string[];
  createdAt?: NativeDate;
  updatedAt?: NativeDate;
};

export type UserType = { user: UserObject };
