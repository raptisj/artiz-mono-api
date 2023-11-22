import mongoose from "mongoose";
import { Request } from "express";

export type UserObject = {
  id?: string;
  username?: string;
  email?: string;
  liked_songs?: string[];
  following?: string[];
  createdAt?: NativeDate;
  updatedAt?: NativeDate;
} & { _id?: mongoose.Types.ObjectId | string };

export type UserType = { user: UserObject };

export type RequestTypeWithUser = Request & UserType;
