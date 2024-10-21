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
        accessorKey: "profile",
        header: "Profile Name",
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        Cell: ({ cell, row }) => (
          <input
            type="text"
            value={cell.getValue()}
            onChange={(e) => onChange(row.index, "firstName", e.target.value)}
          />
        ),
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        Cell: ({ cell, row }) => (
          <input
            type="text"
            value={cell.getValue()}
            onChange={(e) => onChange(row.index, "lastName", e.target.value)}
          />
        ),
      },
      {
        accessorKey: "value",
        header: "Value",
        Cell: ({ cell, row }) => (
          <input
            type="number"
            value={cell.getValue()}
            onChange={(e) =>
              onChange(row.index, "value", Number(e.target.value))
            }
          />
        ),
      },
    ],
    [onChange]
  );

  const innerTable = useMaterialReactTable({
    columns: innerColumns,
    data: addresses,
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
      subRows: [
        {
          firstName: "Branson",
          lastName: "Frami",
          value: 50,
        },
      ],
    },
  ]);

  // Function to calculate the sum of values
  const calculateInitialSum = (subRows) => {
    return subRows.reduce((acc, row) => acc + Number(row.value), 0);
  };

  // Function to equalize values and set sum to 100%
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
        newData[index].sumValue = 100; // Set sum to 100% after equalizing
        return newData;
      });
    },
    [setData]
  );

  // Function to add a new row
  const addRow = useCallback(
    (index) => {
      setData((prevData) => {
        const newData = [...prevData];
        newData[index].subRows = [
          ...newData[index].subRows,
          {
            firstName: "New",
            lastName: "User",
            value: 0, // Initial value
          },
        ];
        newData[index].sumValue = calculateInitialSum(newData[index].subRows); // Update sum after adding a row
        return newData;
      });
    },
    [setData]
  );

  // Function to handle changes in input fields
  const handleChange = useCallback(
    (profileIndex, rowIndex, field, value) => {
      setData((prevData) => {
        const newData = [...prevData];
        newData[profileIndex].subRows[rowIndex][field] = value;
        newData[profileIndex].sumValue = calculateInitialSum(
          newData[profileIndex].subRows
        ); // Update sum after editing
        return newData;
      });
    },
    [setData]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "profile",
        header: "Profile Name",
      },
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "value",
        header: "Value",
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
          onChange={(rowIdx, field, value) =>
            handleChange(rowIndex, rowIdx, field, value)
          }
        />
      );
    },
  });

  return <MRT_TableContainer table={table} />;
};

export default ExpandTable;
