import mongoose from "mongoose";
import Notification from "../models/notification.schema.js";

export const createNotification = async (req, res) => {
  const senderId = req.user.id;
  const { receiverId, type, postId } = req.body;
  if (!senderId || !receiverId || !type) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const newNotification = new Notification({
      senderId,
      receiverId,
      type,
      postId: postId || null,
    });
    await newNotification.save();
    return res.status(201).json({
      success: true,
      message: "Notification created.",
      newNotification,
    });
  } catch (error) {
    console.log(`Error at creating notification: ${error}`);
    return res.status(500).json({ message: "Error creating notification." });
  }
};

export const getAllNotifications = async (req, res) => {
  const userId = req.user.id;
  try {
    const notifications = await Notification.find({ receiverId: userId })
      .populate("senderId", "username profilePic")
      .populate("postId", "_id mediaUrl")
      .sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const notificationId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(notificationId)) {
    return res.status(400).json({ message: "Invalid notification ID." });
  }
  try {
    const notification = await Notification.findByIdAndUpdate(notificationId, {
      isRead: true,
    });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }
    return res.status(200).json({ message: "Notification marked as read." });
  } catch (error) {
    console.log(`Error at marking notification as read: ${error}`);
    return res
      .status(500)
      .json({ success: false, message: "Error marking notification as read." });
  }
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid notification ID." });
  }
  try {
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }
    return res.status(200).json({ message: "Notification deleted." });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
