import React, { useState } from "react";
import {
  MRT_TableContainer,
  useMaterialReactTable,
} from "material-react-table";
import { Switch, Typography, Box } from "@mui/material";

const FilterTable = () => {
  const [showLongTerm, setShowLongTerm] = useState(false);

  const data = [
    { week: 1, unit: 12345, finalunits: 234567, longtermdata: true },
    { week: 2, unit: 123, finalunits: 20000, longtermdata: false },
    { week: 3, unit: 123456, finalunits: 12345, longtermdata: true },
    { week: 4, unit: 123678, finalunits: 40000, longtermdata: false },
  ];

  // Filter data into main and long-term categories
  const mainData = data.filter((item) => !item.longtermdata);
  const longTermData = data.filter((item) => item.longtermdata);

  // Combine data dynamically based on toggle
  const combinedData = [
    ...mainData,
    ...(showLongTerm ? [{ isLongTermHeader: true }] : []),
    ...(showLongTerm ? longTermData : []),
  ];

  // Define table columns
  const columns = [
    {
      accessorKey: "week",
      header: "Week",
      Cell: ({ row }) =>
        row.original.isLongTermHeader ? (
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Long-Term Data
          </Typography>
        ) : (
          row.original.week
        ),
    },
    {
      accessorKey: "unit",
      header: "Unit",
      Cell: ({ row }) =>
        row.original.isLongTermHeader ? null : row.original.unit,
    },
    {
      accessorKey: "finalunits",
      header: "Final Units",
      Cell: ({ row }) =>
        row.original.isLongTermHeader ? null : row.original.finalunits,
    },
  ];

  // Material React Table setup
  const table = useMaterialReactTable({
    columns,
    data: combinedData,
    getRowId: (row) =>
      row.isLongTermHeader ? "longterm-header" : `${row.week}-${row.unit}`,
  });

  return (
    <Box sx={{ padding: "16px" }}>
      {/* Toggle for Long-Term Rows */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <Switch
          checked={showLongTerm}
          onChange={(e) => setShowLongTerm(e.target.checked)}
        />
        <Typography variant="body1" sx={{ marginLeft: "8px" }}>
          Show Long-Term Rows
        </Typography>
      </Box>

      {/* Render Table */}
      <MRT_TableContainer table={table} />
    </Box>
  );
};

export default FilterTable;
