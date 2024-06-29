import express from "express"
const router = express.Router();
import { signup }from "../controllers/auth.js";

router.post("/signup", signup )


router.post("/signin")

router.post("/googleOAuth" )

export default router;