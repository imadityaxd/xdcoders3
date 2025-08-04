import Hackathon from "../models/Hackathon.js";

export const getHackathons = async (req, res) => {
  const data = await Hackathon.find();
  res.json(data);
};

export const createHackathon = async (req, res) => {
  const event = new Hackathon(req.body);
  await event.save();
  res.status(201).json(event);
};
