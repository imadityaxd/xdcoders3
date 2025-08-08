// server.js

// ----------------------------
// 1️⃣ Import required modules
// ----------------------------
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import fetch from "node-fetch"; // For outgoing API requests
import blogRoutes from "./routes/blogRoutes.js";
import docsRoutes from "./routes/docsRoutes.js";
import hackathonRoutes from "./routes/hackathonRoutes.js";
import { v2 as cloudinary } from "cloudinary"; // Cloudinary SDK

// ----------------------------
// 2️⃣ Load environment variables
// ----------------------------
dotenv.config(); // Must be called before using process.env

// ----------------------------
// 3️⃣ Configure Cloudinary
// ----------------------------
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ----------------------------
// 4️⃣ Initialize Express app
// ----------------------------
const app = express();

// ----------------------------
// 5️⃣ Middleware
// ----------------------------
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// ----------------------------
// 6️⃣ Serve static files
// ----------------------------
app.use("/uploads", express.static("uploads"));

// ----------------------------
// 7️⃣ API Routes
// ----------------------------
// Blogs API
app.use("/api/blogs", blogRoutes);

// Docs/PDFs API
app.use("/api", docsRoutes);

// Hackathons API
app.use("/api/hackathons", hackathonRoutes);

// ----------------------------
// 8️⃣ Health check endpoint
// ----------------------------
app.get("/", (req, res) => {
  res.send("Backend is connected ✅");
});

// ----------------------------
// 9️⃣ Test Cloudinary config endpoint
// ----------------------------
app.get("/api/test-cloudinary", (req, res) => {
  res.json(cloudinary.config()); // Should return your cloud_name, api_key (secret hidden)
});

// ----------------------------
// 🔟 Proxy route for Hashnode GraphQL API
// ----------------------------
app.post("/api/hashnode", async (req, res) => {
  const { query } = req.body;
  try {
    const response = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error forwarding request to Hashnode:", error);
    res.status(500).json({ error: "Failed to fetch data from Hashnode" });
  }
});

// ----------------------------
// 1️⃣1️⃣ Connect to MongoDB & Start server
// ----------------------------
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
