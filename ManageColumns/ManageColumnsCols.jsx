import { useMemo } from "react";
const ManageColumnsCols = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "sector",
        header: "Sector",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "brand",
        header: "Brand",
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "profile",
        header: "Profile",
      },
      {
        accessorKey: "updatedby",
        header: "Updated By",
      },
    ],
    []
  );

  return columns;
};

export default ManageColumnsCols;
