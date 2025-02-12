import React, { useState } from "react";
import {
  useMaterialReactTable,
  MRT_TableContainer,
} from "material-react-table";
import { Button } from "@mui/material";

const TableComponent = () => {
  const [data, setData] = useState([
    { id: 1, name: "pradeep", to: "location1", percentage: 25 },
    { id: 2, name: "pradeeptesr", to: "location2", percentage: 25.5 },
    { id: 3, name: "pradeep", to: "location1", percentage: 26.899 },
    { id: 4, name: "pradeeptesr", to: "location2", percentage: 30 },
  ]);

  const columns = [
    { accessorKey: "id", header: "S.No" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "to", header: "To" },
    { accessorKey: "percentage", header: "Percentage" },
  ];

  const addRow = () => {
    setData((prevData) => {
      const newData = [
        ...prevData,
        { name: "New", to: "locationX", percentage: 0 },
      ];
      return newData.map((row, index) => ({ ...row, id: index + 1 }));
    });
  };

  const deleteRow = () => {
    setData((prevData) => {
      if (prevData.length === 0) return prevData;
      const newData = prevData.slice(0, -1);
      return newData.map((row, index) => ({ ...row, id: index + 1 }));
    });
  };

  const equalizePercentage = () => {
    const rowCount = data.length;
    if (rowCount === 0) return;

    let equalValue = Math.floor((100 / rowCount) * 100000) / 100000; // Ensure five decimal places
    let total = equalValue * (rowCount - 1);
    let adjustedValue = (100 - total).toFixed(5);

    let updatedData = data.map((row, index) => ({
      ...row,
      percentage: index === rowCount - 1 ? adjustedValue : equalValue,
    }));

    setData(updatedData);
  };

  const totalPercentage = data
    .reduce((sum, row) => sum + parseFloat(row.percentage), 0)
    .toFixed(5);

  console.log(data);

  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: false, // Enable pagination
  });

  return (
    <div>
      <Button variant="contained" onClick={addRow} style={{ marginRight: 10 }}>
        Add Row
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={deleteRow}
        style={{ marginRight: 10 }}
      >
        Delete Row
      </Button>
      <Button variant="contained" color="primary" onClick={equalizePercentage}>
        Equalize
      </Button>
      <MRT_TableContainer table={table} />
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>
        Sum = {totalPercentage}%
      </div>
    </div>
  );
};

export default TableComponent;
