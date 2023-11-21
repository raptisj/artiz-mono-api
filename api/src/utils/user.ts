import jwt from "jsonwebtoken";
import { UserObject } from "../types/user";

export const jwtSign = (user: UserObject, expiresIn = "24h") => {
  return jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn }
  );
};
