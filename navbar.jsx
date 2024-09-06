import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const isActiveReports = location.pathname.startsWith('/reports');

  return (
    <nav className="navbar">
      <NavLink exact to="/" activeClassName="active" className="nav-link">
        Dashboard
      </NavLink>
      <NavLink to="/events" activeClassName="active" className="nav-link">
        Events
      </NavLink>
      <div className={`nav-link ${isActiveReports ? 'active' : ''}`}>
        Reports
        <div className="submenu">
          <NavLink to="/reports/settings" activeClassName="active" className="submenu-link">
            Settings
          </NavLink>
          <NavLink to="/reports/data" activeClassName="active" className="submenu-link">
            Data
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

.navbar {
  display: flex;
  background-color: #0056b3;
  padding: 10px;
}

.nav-link {
  color: white;
  padding: 10px;
  text-decoration: none;
  position: relative;
}

.nav-link:hover {
  background-color: #0044a1;
}

.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #0056b3;
  padding: 10px;
}

.nav-link.active .submenu {
  display: block;
}

.submenu-link {
  display: block;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
}

.submenu-link:hover {
  background-color: #0044a1;
}

.active {
  background-color: #003b8a;
  font-weight: bold;
}