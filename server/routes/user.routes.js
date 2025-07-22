import express from "express";
import {
  getMyProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "./../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-my-profile", authMiddleware, getMyProfile);
userRouter.get("/logout", logoutUser);

export default userRouter;
