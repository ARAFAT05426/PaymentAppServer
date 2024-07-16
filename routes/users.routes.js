import express from "express";
import { getuser, signinauth, signupauth } from "../controllers/users/users.controlers.js";

const router = express.Router();

router.put("/auth", signupauth);

router.post("/auth", signinauth);
router.get("/", getuser)

const usersroute = router;

export default usersroute;
