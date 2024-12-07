import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userController from "./routes/users.js";
import spotsController from "./routes/spots.js";
import commentsController from "./routes/comments.js";
import uploadController from "./routes/upload.js";
import { logger } from "./middleware/logEvents.js";

dotenv.config();

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI);

app.use("/api/users", userController);
app.use("/api/spots", spotsController);
app.use("/api/comments", commentsController);
app.use("/api/upload", uploadController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
