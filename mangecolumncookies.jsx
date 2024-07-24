import React, { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// Function to set a cookie
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

// Function to get a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
};

const COOKIE_NAME = 'columnVisibility';

const CustomColumnsMenu = ({ columns, columnVisibility, onColumnVisibilityChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Load column visibility from cookies
    const savedVisibility = getCookie(COOKIE_NAME);
    if (savedVisibility) {
      const visibility = JSON.parse(savedVisibility);
      Object.keys(visibility).forEach((key) => {
        onColumnVisibilityChange(key, visibility[key]);
      });
    }
  }, [onColumnVisibilityChange]);

  const handleColumnVisibilityChange = (changedColumnId, newVisibility) => {
    onColumnVisibilityChange(changedColumnId, newVisibility);

    // Save updated column visibility to cookies
    const updatedVisibility = {
      ...columnVisibility,
      [changedColumnId]: newVisibility,
    };
    setCookie(COOKIE_NAME, JSON.stringify(updatedVisibility), 365);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <button onClick={handleMenuToggle}>
        {menuOpen ? "Hide" : "Show"} Columns Menu
      </button>
      {menuOpen && (
        <ul>
          {columns.map((column) => (
            <li key={column.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={columnVisibility[column.id] !== undefined ? columnVisibility[column.id] : true}
                    onChange={(event) =>
                      handleColumnVisibilityChange(
                        column.id,
                        event.target.checked
                      )
                    }
                  />
                }
                label={column.header}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomColumnsMenu;

import React, { useState } from 'react';
import MaterialReactTable from 'material-react-table';
import CustomColumnsMenu from './CustomColumnsMenu';

// Function to get a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
};

const TableComponent = () => {
  const initialVisibility = getCookie('columnVisibility')
    ? JSON.parse(getCookie('columnVisibility'))
    : {};

  const [columnVisibility, setColumnVisibility] = useState(initialVisibility);

  const handleColumnVisibilityChange = (changedColumnId, newVisibility) => {
    setColumnVisibility((prevColumnVisibility) => ({
      ...prevColumnVisibility,
      [changedColumnId]: newVisibility,
    }));
  };

  const table = useMaterialReactTable({
    columns: [
      {
        id: 'firstName',
        header: 'First Name',
      },
      {
        id: 'lastName',
        header: 'Last Name',
      },
      {
        id: 'age',
        header: 'Age',
      },
    ],
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        age: 30,
      },
    ],
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: handleColumnVisibilityChange,
  });

  return (
    <div>
      <MaterialReactTable table={table} />
      <CustomColumnsMenu
        columns={table.columns}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={handleColumnVisibilityChange}
      />
    </div>
  );
};

export default TableComponent;

