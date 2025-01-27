/* eslint-disable react/jsx-pascal-case */
import React, { useMemo, useState } from "react";
import {
  MRT_TableContainer,
  useMaterialReactTable,
} from "material-react-table";
import ManageColumnsCols from "./ManageColumnsCols";
import UpdateColumns from "./UpdateColumns";

const ManageColumns = () => {
  const [columnVisibility, setColumnVisibility] = useState({
    sector: true,
    category: true,
    brand: true,
    type: true,
    profile: true,
    updatedby: true,
  });

  const [columnOrder, setColumnOrder] = useState([]);
  const [columnPinning, setColumnPinning] = useState([]);

  const data = useMemo(
    () => [
      {
        sector: "Sector 1",
        category: "Category 1",
        brand: "Brand 1",
        type: "Type 1",
        profile: "Profile 1",
        updatedby: "User 1",
      },
      {
        sector: "Sector 2",
        category: "Category 2",
        brand: "Brand 2",
        type: "Type 2",
        profile: "Profile 2",
        updatedby: "User 2",
      },
      {
        sector: "Sector 3",
        category: "Category 3",
        brand: "Brand 3",
        type: "Type 3",
        profile: "Profile 3",
        updatedby: "User 3",
      },
    ],
    []
  );

  const handleColumnVisibilityChange = (changedColumnId, newVisibility) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [changedColumnId]: newVisibility,
    }));
  };

  const handleColumnPinningChange = (columnId, isPinned) => {
    const updateColumnPinning = { ...columnPinning };
    if (isPinned) {
      updateColumnPinning.left = [
        ...(updateColumnPinning.left || []),
        columnId,
      ];
    } else {
      updateColumnPinning.left = (updateColumnPinning.left || []).filter(
        (col) => col !== columnId
      );
    }
    setColumnPinning(updateColumnPinning);
  };

  const handleColumnReorder = (newOrder) => {
    setColumnOrder(newOrder);
  };

  const table = useMaterialReactTable({
    columns: ManageColumnsCols(),
    data,
    enableSorting: true,
    enableColumnActions: false,
    enableColumnPinning: true,
    enableColumnOrdering: true,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: handleColumnPinningChange,
    initialState: {
      density: "compact",
    },
    state: {
      columnVisibility,
      columnOrder,
      columnPinning,
    },
  });

  return (
    <>
      {/* Material React Table */}
      <div style={{ margin: "50px 0px" }}>
        <MRT_TableContainer table={table} />
      </div>

      {/* Update Columns Component */}
      <div style={{ margin: "10px 0px" }}>
        <UpdateColumns
          columns={table.options.columns}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={handleColumnVisibilityChange}
          onColumnReorder={handleColumnReorder}
          onColumnPin={handleColumnPinningChange}
        />
      </div>
    </>
  );
};

export default ManageColumns;
