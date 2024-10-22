import React, { useMemo } from "react";
import InputText from "./InputText";

const InnerTableColumns = ({ handleChange }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "to_data",
        header: "To Data",
        enableEditing: false,
      },
      {
        accessorKey: "percentage",
        header: "Percentage",
        Edit: ({ cell, row, column }) => (
          <InputText
            value={cell.getValue()}
            onChange={(value) => handleChange(row.index, column.id, value)}
            isRequired={true}
          />
        ),
      },
    ],
    [handleChange]
  );
  return columns;
};

export default InnerTableColumns;
