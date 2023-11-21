import { Request, Response } from "express";
import users from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserType } from "types/user";

const jwtSign = (user: any, expiresIn = "24h") => {
  return jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn }
  );
};

//@desc Register new user
//@route POST /api/auth/register
//@access public
const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "All fields are mandatory!" });
  }

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User already exists!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await users.create({
      username,
      email,
      password: hashedPassword,
    });

    const accessToken = jwtSign(user);

    res.status(201).json({ _id: user._id, email: user.email, accessToken });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "User data is not valid" });
  }
};

//@desc Login a current user
//@route GET /api/auth/login
//@access public
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are mandatory!" });
  }

  try {
    const user = await users.findOne({ email });
    const isValidUser = user && (await bcrypt.compare(password, user.password));

    if (isValidUser) {
      const accessToken = jwtSign(user);

      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({ message: "Email or password is not valid" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

//@desc Get current user
//@route GET /api/auth/currentUser
//@access private
const currentUser = async (req: Request & UserType, res: Response) => {
  try {
    res.json(req.user);
  } catch (e) {
    console.log(e);
  }
};

export { register, login, currentUser };
