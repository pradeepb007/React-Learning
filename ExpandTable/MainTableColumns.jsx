import React, { useMemo } from "react";
import InputText from "./InputText";

const MainTableColumns = ({ handleMainChange }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "profile_name",
        header: "Profile Name",
        enableEditing: true,
        Cell: ({ cell, row }) => (
          <InputText
            value={cell.getValue()}
            onChange={(value) =>
              handleMainChange(row.original.profile_id, "profile_name", value)
            }
            isRequired={true}
          />
        ),
      },
      {
        accessorKey: "customer_name",
        header: "Customer Name",
        enableEditing: true,
        Cell: ({ cell, row }) => (
          <InputText
            value={cell.getValue()}
            onChange={(value) =>
              handleMainChange(row.original.profile_id, "customer_name", value)
            }
            isRequired={true}
          />
        ),
      },
    ],
    [handleMainChange]
  );
  return columns;
};

export default MainTableColumns;
