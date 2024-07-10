import express from "express"
const router = express.Router();
import { addView, createVideo, deleteVideo, getByTag, getVideo, randomVideos, search, subVideos, trendingVideos, updateVideo }from "../controllers/video.js";
import { isAuthenticated } from "../isAuthenticated.js";

router.post("/", isAuthenticated, createVideo)

router.get("/find/:id", getVideo)

router.put("/:id", isAuthenticated, updateVideo)

router.delete("/:id", isAuthenticated, deleteVideo)

router.put("/view/:id", addView)

router.get("/trend", trendingVideos)

router.get("/random", randomVideos)

router.get("/sub", isAuthenticated, subVideos)

router.get("/tags", getByTag)

router.get("/search", search)


export default router;