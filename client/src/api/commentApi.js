import axios from "./axios";

// Add comment
export const addComment = (postId, data) =>
  axios.post(`/comments/${postId}`, data);

// Get comments of a post
export const getComments = (postId) => axios.get(`/comments/${postId}`);

// Delete comment
export const deleteComment = (commentId) =>
  axios.delete(`/comments/${commentId}`);
