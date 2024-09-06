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


import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import './NavMenu.css';  // Add a custom CSS file for styling

const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            <FaHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li className="has-submenu">
          <NavLink to="/user" activeClassName="active" className="parent-menu">
            <FaUser />
            <span>User</span>
          </NavLink>
          <ul className="submenu">
            <li>
              <NavLink to="/user/profile" activeClassName="active-submenu">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/settings" activeClassName="active-submenu">
                Settings
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active">
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;

.nav-menu {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.nav-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  margin-bottom: 1em;
}

.nav-menu li.has-submenu ul {
  display: none;
  padding-left: 20px;
}

.nav-menu li.has-submenu:hover ul {
  display: block;
}

.nav-menu a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  padding: 10px;
  border-radius: 4px;
}

.nav-menu a:hover {
  background-color: #f0f0f0;
}

.nav-menu .active {
  background-color: #fff;
  color: #007bff;
  font-weight: bold;
}

.nav-menu .active-submenu {
  color: #007bff;
}

.nav-menu .submenu a {
  padding-left: 20px;
  color: #666;
}

.nav-menu .parent-menu {
  position: relative;
}

.nav-menu .parent-menu::after {
  content: '▼';
  position: absolute;
  right: 10px;
  font-size: 0.75em;
  color: #666;
}

.nav-menu .has-submenu .submenu .active-submenu {
  font-weight: normal;
}