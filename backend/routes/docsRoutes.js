// ==============================
// 📄 docsRoutes.js
// Handles fetching PDFs from Cloudinary
// ==============================

// 1️⃣ Dependencies
import express from "express";
import { v2 as cloudinary } from "cloudinary";

// Create a router instance
const router = express.Router();

// 2️⃣ Cloudinary Configuration (from .env)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,               // Cloud name
  api_key: process.env.CLOUDINARY_API_KEY,          // API key
  api_secret: process.env.CLOUDINARY_API_SECRET     // API secret
});

// 3️⃣ GET /api/docs — Fetch latest PDFs
router.get("/docs", async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression("folder:PDFs AND format:pdf")     // Filter: inside PDFs folder, only .pdf
      .sort_by("created_at", "desc")                // Latest first
      .max_results(6)                              // Limit results
      .execute();

    console.log("✅ Found PDFs:", result.resources.length);

    // Return list of PDFs
    res.json(result.resources);

  } catch (err) {
    console.error("❌ Cloudinary API error:", err);
    res.status(500).json({
      error: err.message || "Cloudinary API error",
      details: err
    });
  }
});

// 4️⃣ Export Router
export default router;
