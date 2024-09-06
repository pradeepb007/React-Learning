import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { Button } from '@mui/material'; // Import MUI Button
import './NavMenu.css';  // Ensure this file contains the updated styles

const NavMenu = () => {
  const location = useLocation();

  // Helper function to determine if the link is active
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <nav className="nav-menu">
      <ul className="nav-menu-list">
        <li>
          <NavLink to="/" exact className={isActive('/') ? 'active' : ''}>
            <Button variant="text" className="nav-button">
              <FaHome />
              <span>Home</span>
            </Button>
          </NavLink>
        </li>
        <li className={`has-submenu ${isActive('/user') ? 'active' : ''}`}>
          <span className="nav-link no-link">
            <Button variant="text" className="nav-button">
              <FaUser />
              <span>User</span>
            </Button>
          </span>
          <ul className="submenu">
            <li>
              <NavLink to="/user/profile" className={isActive('/user/profile') ? 'active-submenu' : ''}>
                <Button variant="text" className="nav-button">Profile</Button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/settings" className={isActive('/user/settings') ? 'active-submenu' : ''}>
                <Button variant="text" className="nav-button">Settings</Button>
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink to="/settings" exact className={isActive('/settings') ? 'active' : ''}>
            <Button variant="text" className="nav-button">
              <FaCog />
              <span>Settings</span>
            </Button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;

.nav-menu {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #f8f8f8; /* Optional background color */
}

.nav-menu-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu-list li {
  position: relative;
  margin: 0 1em; /* Space between menu items */
}

.nav-menu .nav-link,
.nav-menu .nav-button {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  padding: 10px;
  border-radius: 4px;
}

.nav-menu .nav-link:hover,
.nav-menu .nav-button:hover {
  background-color: #f0f0f0;
}

.nav-menu .active,
.nav-menu .active .nav-button {
  background-color: #fff;
  color: #007bff;
  font-weight: bold;
}

.nav-menu .active-submenu {
  color: #007bff;
}

.nav-menu .submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 1000; /* Ensure submenu is above other content */
}

.nav-menu .submenu li {
  padding: 0.5em 1em;
}

.nav-menu .submenu a {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
}

.nav-menu .submenu a:hover {
  background-color: #f0f0f0;
}

.nav-menu .has-submenu:hover .submenu {
  display: block;
}

.nav-menu .no-link {
  cursor: default;
}