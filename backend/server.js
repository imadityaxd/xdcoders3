// Importing required modules using ES6 syntax
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes.js";
import docsRoutes from "./routes/docsRoutes.js";
import hackathonRoutes from "./routes/hackathonRoutes.js";
import cors from "cors";
import path from "path";
import fetch from "node-fetch"; // You need this to make outgoing requests

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/blogs", blogRoutes);
app.use("/api/docs", docsRoutes);
app.use("/api/hackathons", hackathonRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is connected ✅");
});

// ✅ Proxy route for Hashnode GraphQL API
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

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
