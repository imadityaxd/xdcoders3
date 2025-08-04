import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
  title: String,
  date: String,
  location: String,
  link: String,
});

export default mongoose.model("Hackathon", hackathonSchema);
