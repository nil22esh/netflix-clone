import mongoose from "mongoose";
import Comment from "../models/comment.schema.js";
import Post from "../models/post.schema.js";

export const createComment = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const { text, replies = [] } = req.body;
  if (!text || !userId || !postId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    const comment = new Comment({
      text,
      userId,
      postId,
      replies,
    });
    await comment.save();
    post.comments.push(comment._id);
    await post.save();
    return res
      .status(201)
      .json({ success: true, message: "comment added successfully", comment });
  } catch (error) {
    console.log(`Error at adding post: ${error}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getCommentsByPost = async (req, res) => {
  const postId = req.params.postId;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ success: false, message: "Invalid post id" });
  }
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    const comments = await Comment.find({ postId: postId });
    return res
      .status(200)
      .json({ success: true, count: comments.length, comments });
  } catch (error) {
    console.log(`Error at getting comments: ${error}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const addComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user.id;
  const { text } = req.body;
  if (!text) {
    return res
      .status(400)
      .json({ success: false, message: "Reply text is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid comment id" });
  }
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "comment not found" });
    }
    const reply = {
      userId,
      text,
    };
    comment.replies.push(reply);
    await comment.save();
    return res.status(201).json({
      success: true,
      message: "Reply added successfully",
      reply,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
