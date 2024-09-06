import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function NavigationMenu() {
  const [openReports, setOpenReports] = useState(false);

  const handleToggleReports = () => {
    setOpenReports(!openReports);
  };

  return (
    <List>
      {/* Reports with dropdown */}
      <ListItem>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon>assessment</Icon>}
          endIcon={openReports ? <ExpandLess /> : <ExpandMore />}
          onClick={handleToggleReports}
          sx={{ borderRadius: '50px', padding: '10px 20px', width: '100%' }}
        >
          Reports
        </Button>
      </ListItem>
      <Collapse in={openReports} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Submenu item 1 */}
          <ListItem sx={{ pl: 4 }}>
            <NavLink to="/reports/subreport1" style={{ textDecoration: 'none', width: '100%' }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Icon>insert_chart</Icon>}
                sx={{ borderRadius: '50px', padding: '10px 20px', width: '100%' }}
              >
                Subreport 1
              </Button>
            </NavLink>
          </ListItem>
          {/* Submenu item 2 */}
          <ListItem sx={{ pl: 4 }}>
            <NavLink to="/reports/subreport2" style={{ textDecoration: 'none', width: '100%' }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Icon>bar_chart</Icon>}
                sx={{ borderRadius: '50px', padding: '10px 20px', width: '100%' }}
              >
                Subreport 2
              </Button>
            </NavLink>
          </ListItem>
        </List>
      </Collapse>

      {/* Another main menu item */}
      <ListItem>
        <NavLink to="/another-page" style={{ textDecoration: 'none', width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icon>dashboard</Icon>}
            sx={{ borderRadius: '50px', padding: '10px 20px', width: '100%' }}
          >
            Another Page
          </Button>
        </NavLink>
      </ListItem>
    </List>
  );
}

export default NavigationMenu;