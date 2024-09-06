import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/Inbox';
import ReportIcon from '@mui/icons-material/Report';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

const NavigationMenu = () => {
  const [openReports, setOpenReports] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const handleReportsClick = () => {
    setOpenReports(!openReports);
  };

  const handleSubMenuClick = () => {
    setOpenSubMenu(!openSubMenu);
  };

  return (
    <List component="nav">
      {/* Dashboard */}
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      {/* Reports Dropdown */}
      <ListItem button onClick={handleReportsClick}>
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
        {openReports ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openReports} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button sx={{ pl: 4 }} onClick={handleSubMenuClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Submenu Item" />
            {openSubMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 8 }}>
                <ListItemIcon>
                  <SubdirectoryArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary="Nested Item 1" />
              </ListItem>
              <ListItem button sx={{ pl: 8 }}>
                <ListItemIcon>
                  <SubdirectoryArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary="Nested Item 2" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button sx={{ pl: 4 }}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Report 2" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default NavigationMenu;