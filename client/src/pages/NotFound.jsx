import React from "react";
import "../styles/NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>We couldn't find the page you're looking for.</p>
      <Link to="/" className="back-home">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
