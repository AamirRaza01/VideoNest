import express from "express"
const router = express.Router();
import { isAuthenticated } from "../isAuthenticated.js"
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from "../controllers/user.js";

router.post("/:id", isAuthenticated,  update)

router.delete("/:id", isAuthenticated, deleteUser)

router.get("/find/:id", getUser)

router.put("/sub/:id", isAuthenticated, subscribe)

router.put("/unsub/:id", isAuthenticated, unsubscribe)

router.put("/like/:videoId", isAuthenticated, like)

router.put("/dislike/:videoId", isAuthenticated, dislike)

export default router;