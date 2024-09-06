import React from 'react';
import { NavLink, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import './Navbar.css'; // You can style using CSS or styled-components

const Navbar = () => {
  return (
    <Router>
      <nav className="navbar">
        <ul className="nav-menu">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <FaHome />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <FaUser />
              <span>User</span>
            </NavLink>
            <ul className="sub-menu">
              <li>
                <NavLink
                  to="/user/profile"
                  className={({ isActive }) => (isActive ? 'sub-link active' : 'sub-link')}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user/settings"
                  className={({ isActive }) => (isActive ? 'sub-link active' : 'sub-link')}
                >
                  Settings
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <FaCog />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/settings" element={<UserSettings />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

// Placeholder components for the routes
const Home = () => <div>Home Page</div>;
const User = () => <div>User Page</div>;
const UserProfile = () => <div>User Profile</div>;
const UserSettings = () => <div>User Settings</div>;
const Settings = () => <div>Settings Page</div>;

export default Navbar;

.navbar {
  background-color: #333;
  padding: 10px;
}

.nav-menu {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px;
}

.nav-link span {
  margin-left: 5px;
}

.nav-link.active {
  background-color: #fff;
  color: #333;
}

.sub-menu {
  list-style: none;
  padding-left: 20px;
  display: none;
}

.nav-menu > li:hover .sub-menu {
  display: block;
}

.sub-link {
  color: #ddd;
  text-decoration: none;
  padding: 5px 10px;
  display: block;
}

.sub-link.active {
  color: #333;
}