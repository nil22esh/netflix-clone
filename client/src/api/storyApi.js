import axios from "./axios";

// Send message
export const postStory = (data) => axios.post("/add-story", data);

// Get user chats
export const getStories = () => axios.get("/get-stories");
