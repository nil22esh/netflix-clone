import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  getFeedPost,
  getPostById,
} from "../controllers/post.controller.js";
import upload from "../middlewares/upload.middleware.js";

const postRouter = express.Router();

postRouter.post(
  "/create-post",
  authMiddleware,
  upload.single("media"),
  createPost
);
postRouter.get("/get-feed-post", authMiddleware, getFeedPost);
postRouter.get("/get-post/:id", authMiddleware, getPostById);
postRouter.delete("/delete-post/:id", authMiddleware, deletePost);

export default postRouter;
