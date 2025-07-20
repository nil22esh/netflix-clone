import mongoose from "mongoose";
import Post from "../models/post.schema.js";
import User from "./../models/user.schema.js";

export const createPost = async (req, res) => {
  const { caption, media, tags, location } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }
  if (!media || !Array.isArray(media) || media.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one media file is required",
    });
  }
  try {
    const post = await Post.create({
      caption: caption?.trim(),
      media,
      tags,
      location: location?.trim(),
      user: userId,
    });
    return res
      .status(201)
      .json({ success: true, message: "Post created successfully", post });
  } catch (error) {
    console.log(`Error while creating post: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getFeedPost = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const user = await User.findById(currentUserId).select("following");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const feedUserIds = [currentUserId, ...user.following];
    const posts = await Post.find({ user: { $in: feedUserIds } }).populate(
      "user"
    );
    //   .populate({
    //     path: "comments",
    //     populate: { path: "userId", select: "username profilePic" },
    //     options: { limit: 2, sort: { createdAt: -1 } },
    //   })
    //   .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Error in getFeedPost:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch feed posts",
    });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid post ID format",
    });
  }
  try {
    const post = await Post.findById(id).populate("user");
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    return res.status(200).json({ success: true, post });
  } catch (error) {
    console.log(`Error while getting post: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid post ID format",
    });
  }
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    return res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.log(`Error while deleting post: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
