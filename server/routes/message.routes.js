import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/send-message", authMiddleware, sendMessage);
messageRouter.get("/get-messages/:chatId", authMiddleware, getMessages);

export default messageRouter;
