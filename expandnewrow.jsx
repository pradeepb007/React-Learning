import React, { useMemo, useState, useCallback } from "react";
import {
  useMaterialReactTable,
  MRT_TableContainer,
} from "material-react-table";

// Inner table component
const InnerTable = ({
  addresses,
  onCalculateSum,
  sumValue,
  onAddRow,
  onChange,
}) => {
  const innerColumns = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          value: cell.getValue(),
          onChange: (e) =>
            onChange(cell.row.index, {
              ...cell.row.original,
              firstName: e.target.value,
              index: cell.row.index, // Pass the index to track edits
            }),
        }),
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          value: cell.getValue(),
          onChange: (e) =>
            onChange(cell.row.index, {
              ...cell.row.original,
              lastName: e.target.value,
              index: cell.row.index, // Pass the index to track edits
            }),
        }),
      },
      {
        accessorKey: "value",
        header: "Value",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          type: "number",
          value: cell.getValue(),
          onChange: (e) =>
            onChange(cell.row.index, {
              ...cell.row.original,
              value: e.target.value,
              index: cell.row.index, // Pass the index to track edits
            }),
        }),
      },
    ],
    [onChange]
  );

  const innerTable = useMaterialReactTable({
    columns: innerColumns,
    data: addresses,
    enableEditing: true,
    editDisplayMode: "table",
    enableTopToolbar: false,
    muiTableHeadCellProps: {
      sx: {
        display: "none",
      },
    },
  });

  return (
    <div>
      <MRT_TableContainer table={innerTable} />
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={onCalculateSum}
            style={{
              padding: "0.5rem 1rem",
              marginRight: "1rem",
              backgroundColor: "yellow",
              border: "none",
              cursor: "pointer",
            }}
          >
            Equalize
          </button>
          <p>Sum = {sumValue}%</p>

          <button
            onClick={onAddRow}
            style={{
              padding: "0.5rem 1rem",
              marginRight: "1rem",
              backgroundColor: "red",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add new row
          </button>
        </div>
      </div>
    </div>
  );
};

const ExpandTable = () => {
  const [data, setData] = useState([
    {
      profile: "Profile A",
      rowId: 1,
      subRows: [
        {
          firstName: "Ervin",
          lastName: "Reinger",
          value: 60,
        },
        {
          firstName: "Brittany",
          lastName: "McCullough",
          value: 50,
        },
      ],
    },
    {
      profile: "Profile B",
      rowId: 2,
      subRows: [
        {
          firstName: "Branson",
          lastName: "Frami",
          value: 50,
        },
      ],
    },
  ]);

  const [editedRows, setEditedRows] = useState({});

  const calculateInitialSum = (subRows) => {
    return subRows.reduce((acc, row) => acc + Number(row.value), 0);
  };

  const calculateSum = useCallback(
    (index) => {
      setData((prevData) => {
        const newData = [...prevData];
        const subRows = newData[index].subRows;
        const equalValue = 100 / subRows.length;

        const updatedSubRows = subRows.map((row) => ({
          ...row,
          value: equalValue,
        }));

        newData[index].subRows = updatedSubRows;
        newData[index].sumValue = 100;
        trackEditedRow(newData[index].rowId, updatedSubRows);
        return newData;
      });
    },
    [setData]
  );

  const addRow = useCallback(
    (index) => {
      setData((prevData) => {
        const newData = [...prevData];
        newData[index].subRows = [
          ...newData[index].subRows,
          {
            firstName: "New",
            lastName: "User",
            value: 0,
          },
        ];
        newData[index].sumValue = calculateInitialSum(newData[index].subRows);
        return newData;
      });
    },
    [setData]
  );

  const handleChange = useCallback(
    (profileIndex, updatedRow) => {
      setData((prevData) => {
        const newData = [...prevData];
        // Update the specific sub-row with the changes
        newData[profileIndex].subRows = newData[profileIndex].subRows.map(
          (row, index) => (index === updatedRow.index ? updatedRow : row)
        );
        newData[profileIndex].sumValue = calculateInitialSum(
          newData[profileIndex].subRows
        );
        trackEditedRow(
          newData[profileIndex].rowId,
          newData[profileIndex].subRows
        );
        return newData;
      });
    },
    [setData]
  );

  const trackEditedRow = (rowId, subRows) => {
    setEditedRows((prevEdited) => ({
      ...prevEdited,
      [rowId]: [...subRows], // Clone subRows to ensure immutability
    }));
  };

  const handleSubmit = () => {
    const editedData = Object.keys(editedRows).map((rowId) => ({
      rowId,
      subRows: editedRows[rowId],
    }));
    console.log("Submitting data:", editedData);
    // API call here
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "profile",
        header: "Profile Name",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    renderDetailPanel: ({ row }) => {
      const addresses = row.original.subRows || [];
      const rowIndex = row.index;
      const sumValue = row.original.sumValue || calculateInitialSum(addresses);

      return (
        <InnerTable
          addresses={addresses}
          onCalculateSum={() => calculateSum(rowIndex)}
          sumValue={sumValue}
          onAddRow={() => addRow(rowIndex)}
          onChange={(rowIdx, values) => handleChange(rowIndex, values)}
        />
      );
    },
  });

  return (
    <div>
      <MRT_TableContainer table={table} />
      <button
        onClick={handleSubmit}
        style={{
          padding: "0.5rem 1rem",
          marginTop: "1rem",
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default ExpandTable;
