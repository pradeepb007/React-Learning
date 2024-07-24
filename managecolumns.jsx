// TableComponent.js
import React from 'react';
import MaterialReactTable from 'material-react-table';
import CustomColumnsMenu from './CustomColumnsMenu';

const TableComponent = () => {
  const [columnVisibility, setColumnVisibility] = useState({
    firstName: true,
    lastName: true,
    age: true,
  });

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

// CustomColumnsMenu.js
import React, { useState } from 'react';

const CustomColumnsMenu = ({ columns, columnVisibility, onColumnVisibilityChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleColumnVisibilityChange = (changedColumnId, newVisibility) => {
    onColumnVisibilityChange(changedColumnId, newVisibility);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <button onClick={handleMenuToggle}>
        {menuOpen ? 'Hide' : 'Show'} Columns Menu
      </button>
      {menuOpen && (
        <ul>
          {columns.map((column) => (
            <li key={column.id}>
              <label>
                <input
                  type="checkbox"
                  checked={columnVisibility[column.id]}
                  onChange={(event) =>
                    handleColumnVisibilityChange(column.id, event.target.checked)
                  }
                />
                {column.header}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomColumnsMenu;
