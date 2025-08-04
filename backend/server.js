// Importing required modules using ES6 syntax
import express from "express"; // Express framework for building the server
import dotenv from "dotenv"; // For loading environment variables from a .env file
import mongoose from "mongoose"; // MongoDB object modeling tool to connect and work with MongoDB
import blogRoutes from "./routes/blogRoutes.js"; // Routes related to blog operations
import docsRoutes from "./routes/docsRoutes.js"; // Routes related to documentation
import hackathonRoutes from "./routes/hackathonRoutes.js"; // Routes for managing hackathon data
import cors from "cors"; // Middleware to enable Cross-Origin Resource Sharing
import path from "path"; // Core Node module used for handling file and directory paths

// Load environment variables (like PORT and MONGO_URI) from .env file into process.env
dotenv.config();

// Create an instance of the Express application
const app = express();

// Enable CORS to allow requests from different origins (e.g., frontend hosted elsewhere)
app.use(cors());

// Middleware to parse incoming JSON payloads in requests (e.g., req.body)
app.use(express.json());

// Serve static files from the "uploads" folder when requested at "/uploads" path
// e.g., accessing /uploads/image.png will serve uploads/image.png
app.use("/uploads", express.static("uploads"));

// Define API routes and associate them with their respective route handlers
app.use("/api/blogs", blogRoutes); // All blog-related routes will be prefixed with /api/blogs
app.use("/api/docs", docsRoutes); // All docs-related routes will be prefixed with /api/docs
app.use("/api/hackathons", hackathonRoutes); // All hackathon-related routes will be prefixed with /api/hackathons

// Add this route just to check frontend-backend connection
app.get("/", (req, res) => {
  res.send("Backend is connected ✅");
});

// Connect to MongoDB using Mongoose with the URI from the environment variable
mongoose
  .connect(process.env.MONGO_URI) // Connection string to your MongoDB database
  .then(() => {
    // Once connected, start the server and listen on the specified PORT (from .env or default to 5000)
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err)); // Log any errors that occur during MongoDB connection
