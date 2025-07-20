import express from "express";
import authMiddleware from "./../middlewares/auth.middleware.js";
import { toggleLike } from "../controllers/like.controller.js";

const likeRouter = express.Router();
toggleLike;
likeRouter.put("/:postId/toggle-like", authMiddleware, toggleLike);

export default likeRouter;
