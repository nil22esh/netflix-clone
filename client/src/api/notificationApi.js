import axios from "./axios";

// Get all notifications
export const getNotifications = () => axios.get("/notifications");

// Mark all as read
export const markAllRead = () => axios.put("/notifications/mark-all-read");

// Delete notification
export const deleteNotification = (id) => axios.delete(`/notifications/${id}`);
