import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";

import artistsRouter from "./routers/artists";

import express from "express";

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI);

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", artistsRouter);

app.listen(port, () => {
  console.log(`This app listening at http://localhost:${port}`);
});
