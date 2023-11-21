import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserType } from "types/user";

const verifyUser = (
  req: Request & UserType,
  res: Response,
  next: NextFunction
) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err: any, decoded: UserType) => {
        if (err) {
          res.status(401);
          throw new Error("User is not authorized");
        }
        req.user = decoded.user;
        next();
      }
    );

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
};

export { verifyUser };
