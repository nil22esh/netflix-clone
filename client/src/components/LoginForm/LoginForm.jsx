import React, { useContext, useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../api/userApi";
import { toast } from "react-toastify";

function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    console.log("Login attempt:", formData);
    try {
      const response = await loginUser(formData);
      console.log(response);
      toast.success("Login successful!");
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Try again.";
      toast.error(message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo">Instagram</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Log In</button>
        </form>

        <div className="divider">OR</div>

        <button className="login-facebook">Log in with Facebook</button>
        <p className="forgot-password">Forgot password?</p>
      </div>

      <div className="signup-box">
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>

      <div className="get-app">
        <p>Get the app.</p>
        <div className="store-buttons">
          <img
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english_en.png/9fc4bab7565b.png"
            alt="App Store"
          />
          <img
            src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english_en.png/6071ff054d63.png"
            alt="Google Play"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
