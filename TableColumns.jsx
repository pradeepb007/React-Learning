import React, { useMemo } from "react";
import { TextField } from "@mui/material";

const TableColumns = ({ selectedUnit, convertLength, handleCellEdit }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "week",
        header: "Weeks",
        enableEditing: false,
      },
      {
        accessorKey: "unit",
        header: "Units",
        Cell: ({ row, column }) =>
          convertLength(row.original[column.id], selectedUnit),
        enableEditing: false,
      },
      {
        accessorKey: "editedUnit",
        header: "Edit Units",
        muiEditTextFieldProps: ({ row, column }) => ({
          type: "number",
          onChange: (event) => {
            handleCellEdit(row.index, column.id, event.target.value);
          },
        }),
        // Edit: ({ column, row }) => {
        //   if (!row.original.active) {
        //     // Render non-editable cell for inactive rows
        //     return (
        //       <div>{convertLength(row.original[column.id], selectedUnit)}</div>
        //     );
        //   }

        //   // Render editable TextField for active rows
        //   const value = row.original[column.id];
        //   const initialValue = convertLength(value, selectedUnit);
        //   return (
        //     <TextField
        //       type="number"
        //       value={initialValue}
        //       onChange={(e) => {
        //         handleCellEdit(row.index, column.id, e.target.value);
        //       }}
        //     />
        //   );
        // },
      },
      {
        accessorKey: "finalUnit",
        header: "Final Unit",
        Cell: ({ row, column }) =>
          convertLength(row.original[column.id], selectedUnit),
        enableEditing: false,
      },
    ],
    [selectedUnit, convertLength, handleCellEdit]
  );

  return columns;
};

export default TableColumns;
