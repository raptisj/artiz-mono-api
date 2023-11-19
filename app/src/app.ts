import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";

import artistsModel from "../src/models/artists";

import express from "express";

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI);

app.use("/", async (req, res) => {
  const result = await artistsModel.find();
  console.log(result, "result");
  res.send(`${result}`);
});

app.listen(port, () => {
  console.log(`This app listening at http://localhost:${port}`);
});
