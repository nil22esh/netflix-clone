import experss from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createNotification,
  deleteNotification,
  getAllNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller.js";

const notificationRouter = experss.Router();

notificationRouter.post(
  "/send-notification",
  authMiddleware,
  createNotification
);
notificationRouter.get(
  "/get-notifications",
  authMiddleware,
  getAllNotifications
);
notificationRouter.put(
  "/send-notification/read/:id",
  authMiddleware,
  markNotificationAsRead
);
notificationRouter.delete(
  "/delete-notification/:id",
  authMiddleware,
  deleteNotification
);

export default notificationRouter;
