import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnection from "./db/dbConnect.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import storyRouter from "./routes/story.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import messageRouter from "./routes/message.routes.js";
import followRouter from "./routes/follow.routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const env = process.env.ENV || "dev";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/follows", followRouter);
app.use("/api/v1/stories", storyRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/messages", messageRouter);

app.listen(port, () => {
  console.log(`server is running on ${env} environment ${port} port.`);
  dbConnection();
});
