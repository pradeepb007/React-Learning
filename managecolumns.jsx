const CustomColumnsMenu = ({ table }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="custom-columns-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Show/Hide Columns
      </Button>
      <Menu
        id="custom-columns-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* Custom Buttons or Controls */}
        <MenuItem onClick={handleClose}>Custom Button 1</MenuItem>
        <MenuItem onClick={handleClose}>Custom Button 2</MenuItem>

        {/* Show/Hide Columns Menu Items */}
        <MRT_ShowHideColumnsMenuItems
          table={table}
          closeMenu={handleClose}
        />
      </Menu>
    </div>
  );
};
import React from 'react';
import { MaterialReactTable } from 'material-react-table';
import { CustomColumnsMenu } from './CustomColumnsMenu';

const TableMain = ({ data, columns }) => {
  const tableInstance = useTableInstance({ data, columns });

  return (
    <div>
      <CustomColumnsMenu table={tableInstance} />
      <MaterialReactTable
        tableInstance={tableInstance}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default TableMain;
