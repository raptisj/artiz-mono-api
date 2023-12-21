import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { RequestTypeWithUser } from "../types/user";
import users from "../models/user";
import artists from "../models/artist";
import songs from "../models/song";
import playlists from "../models/playlist";
import mongoose from "mongoose";
import { jwtSign } from "../utils/user";
import { getMongooseValidationErrors } from "../utils/errorHandling";

//@desc Register new user
//@route POST /api/users/register
//@access public
const register = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  const { username, email, password } = req.body;

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
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = getMongooseValidationErrors(error);

      res.status(404).json({ errors: validationErrors });
    }

    res.status(400).json({ message: "Something went wrong!" });
  }
};

//@desc Login a current user
//@route GET /api/users/login
//@access public
const login = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
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
      throw Error();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Email or password is not valid" });
  }
};

//@desc Get current user
//@route GET /api/users/currentUser
//@access private
const currentUser = async (req: RequestTypeWithUser, res: Response) => {
  // #swagger.tags = ['User']
  try {
    res.json(req.user);
  } catch (error) {
    console.log(error);
  }
};

//@desc Get current user's profile along with the songs they liked and the artists they follow
//@route GET /api/users/me
//@access private
//query params ?following=true&liked_songs=true&playlist_collection=true to embed objects in response
const userProfile = async (req: RequestTypeWithUser, res: Response) => {
  // #swagger.tags = ['User']
  const following = req.query.following;
  const liked_songs = req.query.liked_songs;
  const playlist_collection = req.query.playlists;
  const userId = req.user.id;

  try {
    const user = await users.findOne({ _id: userId }, { password: 0 });
    const result = { profile: user } as any;

    if (following) {
      const followingArtists = await artists.find({
        _id: { $in: user.following },
      });

      result.followingArtists = followingArtists;
    }

    if (liked_songs) {
      const likedSongs = await songs.find(
        {
          _id: { $in: user.liked_songs },
        },
        { added_to_playlist_dates: 0 }
      );

      result.likedSongs = likedSongs;
    }

    if (playlist_collection) {
      const playlistCollection = await playlists.find({
        user_id: userId,
      });

      result.playlistCollection = playlistCollection;
    }

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

//@desc Mark a song as liked
//@route PUT /api/users/me/song
//@access private
const addLikedSongs = async (req: RequestTypeWithUser, res: Response) => {
  // #swagger.tags = ['User']
  const { song_id } = req.body;
  const userId = req.user.id;

  try {
    const user = await users.findOne({ _id: userId }, { password: 0 });
    const isLiked = user.existsInFavorite(song_id);

    if (!isLiked) {
      const updatedUser = await users.updateOne(
        { _id: userId },
        { $push: { liked_songs: song_id } },
        { new: true }
      );

      res.json(updatedUser);
    } else {
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

//@desc Remove a song from liked list
//@route PUT /api/users/me/remove_song
//@access private
const removeLikedSongs = async (req: RequestTypeWithUser, res: Response) => {
  // #swagger.tags = ['User']
  const { song_id } = req.body;
  const userId = req.user.id;

  try {
    const user = await users.findOneAndUpdate(
      { _id: userId },
      { $pull: { liked_songs: song_id } },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

//@desc Follow an artist
//@route PUT /api/users/me/following
//@access private
const addFollowing = async (req: RequestTypeWithUser, res: Response) => {
  // #swagger.tags = ['User']
  const { artist_id } = req.body;
  const userId = req.user.id;

  try {
    const user = await users.findOne({ _id: userId }, { password: 0 });
    const isFollowing = user.existsInFollowing(artist_id);

    if (!isFollowing) {
      const updatedUser = await users.updateOne(
        { _id: userId },
        { $push: { following: artist_id } },
        { new: true }
      );

      res.json(updatedUser);
    } else {
      res.json(user);
    }
  } catch (error) {
    console.log(error);
  }
};

//@desc Unfollow an artist
//@route PUT /api/users/me/remove_following
//@access private
const removeFollowing = async (req: RequestTypeWithUser, res: Response) => {
  // #swagger.tags = ['User']
  const { artist_id } = req.body;
  const userId = req.user.id;

  try {
    const user = await users.findOneAndUpdate(
      { _id: userId },
      { $pull: { following: artist_id } },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export {
  register,
  login,
  currentUser,
  userProfile,
  addLikedSongs,
  removeLikedSongs,
  addFollowing,
  removeFollowing,
};
