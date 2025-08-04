import express from "express";
import { getHackathons, createHackathon } from "../controllers/hackathonController.js";

const router = express.Router();

router.get("/", getHackathons);
router.post("/", createHackathon);

export default router;
