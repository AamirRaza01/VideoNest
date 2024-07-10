import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comments.js";
import {errorHandler} from "../errorHandler.js"
import { isAuthenticated } from "../isAuthenticated.js";
const router = express.Router();

router.post("/", isAuthenticated, addComment)

router.delete("/:id", isAuthenticated, deleteComment)

router.get("/:videoId", getComments)

export default router;