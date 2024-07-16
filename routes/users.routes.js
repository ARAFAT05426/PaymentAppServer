import express from "express";
import {auth} from "../controllers/users/users.controlers.js";

const router = express.Router();

router.put("/auth", auth);

router.get("/auth", auth);

const usersroute = router; 

export default usersroute;
