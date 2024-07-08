import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import commentsRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(express.urlencoded({extended:true}))  // if we are giving inputs in format of x-www-form-urlencoded in POSTMAN, then it should be given 
app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentsRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(3000, () => {
  connect();
  console.log("connected to server");
});
