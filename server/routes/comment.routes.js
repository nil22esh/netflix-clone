import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  addComment,
  createComment,
  getCommentsByPost,
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.post("/:postId/add-comment", authMiddleware, createComment);
commentRouter.get(
  "/:postId/get-all-comments",
  authMiddleware,
  getCommentsByPost
);
commentRouter.post("/:commentId/reply", authMiddleware, addComment);

export default commentRouter;
