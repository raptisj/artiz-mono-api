import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json";

import artistRouter from "./routers/artist";
import userRouter from "./routers/user";
import playlistRouter from "./routers/playlist";
import songRouter from "./routers/song";

import express from "express";

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI);

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", artistRouter);
app.use("/api/", userRouter);
app.use("/api/", playlistRouter);
app.use("/api/", songRouter);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`This app listening at http://localhost:${port}`);
});
