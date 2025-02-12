import React from "react";
import {
  useMaterialReactTable,
  MRT_TableContainer,
} from "material-react-table";

const data = [
  {
    da_id: 1,
    splits: [
      { id: 1, name: "pradeep", to: "location1", percentage: 50 },
      { id: 2, name: "pradeeptesr", to: "location2", percentage: 50 },
    ],
  },
  {
    da_id: 2,
    splits: [
      { id: 3, name: "pradeep", to: "location1", percentage: 50 },
      { id: 4, name: "pradeeptesr", to: "location2", percentage: 50 },
    ],
  },
];

const transformedData = data.flatMap((entry) =>
  entry.splits.map((split, index, array) => ({
    ...split,
    da_id: entry.da_id,
    isLastInGroup: index === array.length - 1,
  }))
);

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "to", header: "To" },
  { accessorKey: "percentage", header: "Percentage" },
];

const SplitTable = () => {
  const table = useMaterialReactTable({
    columns,
    data: transformedData,
    muiTableBodyRowProps: ({ row }) => ({
      sx: row.original.isLastInGroup ? { borderBottom: "2px solid black" } : {},
    }),
    initialState: { grouping: ["da_id"] },
  });

  return <MRT_TableContainer table={table} />;
};

export default SplitTable;
