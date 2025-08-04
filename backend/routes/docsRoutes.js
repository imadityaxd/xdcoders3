import express from "express";
import multer from "multer";
import { getDocs, uploadDoc } from "../controllers/docsController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getDocs);
router.post("/", upload.single("file"), uploadDoc);

export default router;
