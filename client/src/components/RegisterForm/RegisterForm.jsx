import React, { useContext, useState } from "react";
import "./RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { registerUser } from "../../api/userApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, name, username, password } = formData;
    if (!email || !name || !username || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    console.log("Registration Data:", formData);
    setLoading(true);
    try {
      const response = await registerUser(formData);
      console.log(response.data.user);
      toast.success("Registration successful!");
      setUser(response.data.user);
      navigate("/login");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Registration failed. Try again.";
      toast.error(message);
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="logo">Instagram</h1>
        <p className="register-msg">
          Sign up to see photos and videos from your friends.
        </p>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
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
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="terms-msg">
          By signing up, you agree to our Terms, Privacy Policy and Cookies
          Policy.
        </p>
      </div>

      <div className="login-link-box">
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
