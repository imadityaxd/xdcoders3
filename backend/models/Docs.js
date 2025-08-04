import mongoose from "mongoose";

const docsSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileUrl: String,
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Docs", docsSchema);
