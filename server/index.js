import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import commentsRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";

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

app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500 ;
  const message = err.message || "something went wrong"
  return res.status(status).json({
    success : false,
    status, 
    message
  })
})

app.listen(3000, () => {
  connect()
  console.log("connected to server");
});
