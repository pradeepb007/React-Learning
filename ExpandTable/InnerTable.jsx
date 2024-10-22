//InnerTable.jsx
import {
  useMaterialReactTable,
  MRT_TableContainer,
} from "material-react-table";
import InnerTableColumns from "./InnerTableColumns";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

// Inner table component
const InnerTable = ({ subData, onDataChange }) => {
  const [data, setData] = useState(subData);
  const [sumValue, setSumValue] = useState(0);

  useEffect(() => {
    const sum = data.reduce((acc, item) => acc + item.percentage, 0);
    setSumValue(sum);
    if (onDataChange) {
      onDataChange(data);
    }
  }, [data, onDataChange]);

  const handleEqualize = () => {
    const equalSplit = 100 / data.length;
    const updatedData = data.map((item) => ({
      ...item,
      percentage: equalSplit,
    }));
    setData(updatedData);
  };

  const handleAddRow = () => {
    const newRow = {
      to_data: "",
      percentage: 0,
    };

    setData([...data, newRow]);
  };

  const handleChange = (rowIndex, columnId, value) => {
    setData((prevData) =>
      prevData.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  const innerTable = useMaterialReactTable({
    columns: InnerTableColumns({ handleChange }),
    data: data,
    enableEditing: true,
    editDisplayMode: "table",
    enablePagination: false,
    enableRowSelection: true,
    enableTopToolbar: false,
    muiTableHeadCellProps: {
      sx: {
        display: "none",
      },
    },
  });

  return (
    <div>
      {/* Render the inner table */}
      <MRT_TableContainer table={innerTable} />
      {/* Button and text box for calculating the sum */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 30,
          }}
        >
          <Button variant="contained" onClick={handleEqualize}>
            Equalize
          </Button>
          <p>Sum = {sumValue}%</p>

          <Button variant="contained" color="success" onClick={handleAddRow}>
            Add new row
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InnerTable;
