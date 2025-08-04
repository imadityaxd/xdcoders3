import Docs from "../models/Docs.js";

export const getDocs = async (req, res) => {
  const docs = await Docs.find();
  res.json(docs);
};

export const uploadDoc = async (req, res) => {
  const { title, description } = req.body;
  const fileUrl = req.file?.path || "";
  const newDoc = new Docs({ title, description, fileUrl });
  await newDoc.save();
  res.status(201).json(newDoc);
};
