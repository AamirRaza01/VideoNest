import express from "express"
const router = express.Router();
import { googleAuth, signin, signup } from "../controllers/auth.js";

router.post("/signup", signup);

router.post("/signin", signin)  

router.post("/googleAuth", googleAuth)


export default router;