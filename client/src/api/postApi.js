import axios from "./axios";

// Create post
export const createPost = (data) => axios.post("/posts", data);

// Get all posts for feed
export const getFeedPosts = () => axios.get("/posts/feed");

// Get single post
export const getPostById = (id) => axios.get(`/posts/${id}`);

// Delete post
export const deletePost = (id) => axios.delete(`/posts/${id}`);

// Get user posts
export const getUserPosts = (userId) => axios.get(`/posts/user/${userId}`);
