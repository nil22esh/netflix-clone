import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/instagram-logo.png";
import "./Navbar.css";

function Navbar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
    { name: "Explore", path: "/explore" },
    { name: "Messages", path: "/messages" },
    { name: "Reels", path: "/reels" },
    { name: "Notifications", path: "/notifications" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="navbar p-2">
      <div className="navbar__logo">
        <img src={logo} alt="logo" />
      </div>

      <ul className="navbar__links">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar__settings">
        <NavLink to="/settings" className="nav-link">
          Settings
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
