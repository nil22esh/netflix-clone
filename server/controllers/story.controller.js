import Story from "../models/story.schema.js";
import User from "../models/user.schema.js";
import mongoose from "mongoose";

export const addStory = async (req, res) => {
  const userId = req.user.id;
  const { mediaUrl, type } = req.body;
  if (!mediaUrl || !type) {
    return res
      .status(400)
      .json({ message: "Please provide mediaUrl and type" });
  }
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const story = new Story({
      userId,
      mediaUrl,
      type,
    });
    await story.save();
    return res.status(201).json({ message: "Story added successfully", story });
  } catch (error) {
    console.log(`Error at adding story: ${error}`);
    return res.status(500).json({ message: "Error at adding story" });
  }
};

export const getStories = async (req, res) => {
  const userId = req.user.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user id" });
  }
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const stories = await Story.find({ userId: userId });
    return res.status(200).json({
      success: true,
      count: stories.length,
      message: "Stories fetched successfully",
      stories,
    });
  } catch (error) {
    console.log(`Error at getting stories: ${error}`);
    return res.status(500).json({ message: "Error at getting stories" });
  }
};
