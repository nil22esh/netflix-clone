import axios from "./axios";

// Register user
export const registerUser = (data) => axios.post("/users/register", data);

// Login user
export const loginUser = (data) => axios.post("/users/login", data);

// Get user profile
export const getMyProfile = () => axios.get("/users/get-my-profile");

// Search users
export const searchUsers = (query) => axios.get(`/users/search?query=${query}`);

// Update profile
export const updateProfile = (data) => axios.put("/users/update", data);

// Get suggested users
export const getSuggestedUsers = () => axios.get("/users/suggestions");
