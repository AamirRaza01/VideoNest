import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(400, "You need to login!"));

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return next(errorHandler(400, "You are not authenticated!"));

    req.user = user;
    next();
  });
};
