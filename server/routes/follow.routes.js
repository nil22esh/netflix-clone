import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getFollowers,
  getFollowing,
  toggleFollow,
} from "../controllers/follow.controller.js";

const followRouter = express.Router();

followRouter.put("/toggle-follow", authMiddleware, toggleFollow);
followRouter.get("/followers", authMiddleware, getFollowers);
followRouter.get("/following", authMiddleware, getFollowing);

export default followRouter;
