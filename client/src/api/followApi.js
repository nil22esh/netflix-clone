import axios from "./axios";

// Follow user
export const followUser = (userId) => axios.post(`/follow/${userId}`);

// Unfollow user
export const unfollowUser = (userId) => axios.delete(`/follow/${userId}`);

// Get followers/following
export const getFollowers = (userId) =>
  axios.get(`/follow/followers/${userId}`);
export const getFollowing = (userId) =>
  axios.get(`/follow/following/${userId}`);
