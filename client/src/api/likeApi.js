import axios from "./axios";

// Like a post
export const likePost = (postId) => axios.post(`/likes/${postId}`);

// Unlike a post
export const unlikePost = (postId) => axios.delete(`/likes/${postId}`);

// Get likes on a post
export const getLikes = (postId) => axios.get(`/likes/${postId}`);
