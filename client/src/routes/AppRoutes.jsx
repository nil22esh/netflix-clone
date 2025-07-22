import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import Home from "./../pages/Home";
import Profile from "./../pages/Profile";
import PostDetails from "../pages/PostDetails";
import Chat from "../pages/Chat";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main App */}
      <Route path="/" element={<Home />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/post/:postId" element={<PostDetails />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
