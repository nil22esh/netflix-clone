import axios from "./axios";

// Send message
export const sendMessage = (data) => axios.post("/messages", data);

// Get user chats
export const getUserChats = () => axios.get("/messages/chats");

// Get messages in a chat
export const getChatMessages = (chatId) =>
  axios.get(`/messages/chat/${chatId}`);
