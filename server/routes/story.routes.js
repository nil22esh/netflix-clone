import express from "express";
import authMiddleware from "./../middlewares/auth.middleware.js";
import { addStory, getStories } from "../controllers/story.controller.js";

const storyRouter = express.Router();

storyRouter.post("/add-story", authMiddleware, addStory);
storyRouter.get("/get-stories", authMiddleware, getStories);

export default storyRouter;
