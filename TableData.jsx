import React, { useEffect, useMemo, useState } from "react";
import {
  useMaterialReactTable,
  MRT_TableContainer,
} from "material-react-table";
import { Button, Grid, ButtonGroup } from "@mui/material";
import TableColumns from "./TableColumns";

const data = [
  {
    week: "12/06/2024",
    unit: "100",
    prevUnit: "90",
    editedUnit: "104",
    finalUnit: "104",
    approved: true,
    active: true,
    originalUnit: "cm",
  },
  {
    week: "13/06/2024",
    unit: "100",
    prevUnit: "70",
    editedUnit: "105",
    finalUnit: "105",
    approved: false,
    active: true,
    originalUnit: "cm",
  },
  {
    week: "14/06/2024",
    unit: "100",
    prevUnit: "90",
    editedUnit: "110",
    approved: false,
    finalUnit: "110",
    active: true,
    originalUnit: "cm",
  },
  {
    week: "15/06/2024",
    unit: "100",
    prevUnit: "60",
    editedUnit: "100",
    finalUnit: "200",
    approved: false,
    active: false,
    originalUnit: "cm",
  },
  {
    week: "16/06/2024",
    unit: "120",
    prevUnit: "80",
    editedUnit: "105",
    finalUnit: "125",
    approved: false,
    active: false,
    originalUnit: "cm",
  },
];

const TableData = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [selectedUnit, setSelectedUnit] = useState("cm");
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    const initialRowSelection = {};
    if (data) {
      data.forEach((row, index) => {
        if (row.approved) {
          initialRowSelection[index] = true;
        }
      });
    }
    setRowSelection(initialRowSelection);
  }, [data]);

  const handleSave = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = async () => {
    try {
      const selectedRowIds = Object.keys(rowSelection).filter(
        (key) => rowSelection[key]
      );

      const updatedRowData = tableData.map((row, index) => {
        if (selectedRowIds.includes(index.toString())) {
          return { ...row, approved: true };
        }
        return { ...row, approved: false };
      });

      const convertToCm = (value, unit) => {
        switch (unit) {
          case "mm":
            return value / 10;
          case "m":
            return value * 100;
          default:
            return value;
        }
      };

      const updatedData = updatedRowData.map((row) => ({
        ...row,
        editedUnit: convertToCm(row.editedUnit, selectedUnit),
        finalUnit: convertToCm(row.finalUnit, selectedUnit),
      }));

      console.log("updatedData", updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  const convertLength = (value, unit) => {
    let convertedValue;
    switch (unit) {
      case "mm":
        convertedValue = value * 10;
        break;
      case "m":
        convertedValue = value / 100;
        break;
      default:
        convertedValue = value;
    }
    return convertedValue;
  };

  const handleCellEdit = (rowIndex, columnId, value) => {
    const updatedData = [...tableData];
    //updatedData[rowIndex][columnId] = value;
    setTableData(updatedData);
    console.log(rowSelection);

    const initialRowSelection = { ...rowSelection, [rowIndex]: true };
    setRowSelection(initialRowSelection);
  };

  const prevColumns = useMemo(
    () => [
      {
        accessorKey: "week",
        header: "Week",
      },
      {
        accessorKey: "prevUnit",
        header: "Units",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: TableColumns({ selectedUnit, convertLength, handleCellEdit }),
    data: tableData,
    enableRowSelection: (row) => row.original.active,
    onRowSelectionChange: setRowSelection,
    enableEditing: true,
    editDisplayMode: "table",
    state: {
      rowSelection,
    },
  });

  const table2 = useMaterialReactTable({
    columns: prevColumns,
    data: tableData,
  });

  return (
    <>
      <Button onClick={handleSave}>Save</Button>

      <ButtonGroup>
        {["cm", "mm", "m"].map((unit) => (
          <Button
            key={unit}
            variant={selectedUnit === unit ? "contained" : "outlined"}
            onClick={() => handleUnitChange(unit)}
          >
            {unit}
          </Button>
        ))}
      </ButtonGroup>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MRT_TableContainer table={table} />
        </Grid>
        <Grid item xs={12}>
          <MRT_TableContainer table={table2} />
        </Grid>
      </Grid>

      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export default TableData;
