import React, { useMemo, useState } from "react";
import {
  useMaterialReactTable,
  MRT_TableContainer,
} from "material-react-table";

// Inner table component
const InnerTable = ({ addresses, onCalculateSum, sumValue }) => {
  const innerColumns = useMemo(
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
        accessorKey: "address",
        header: "Address",
      },
    ],
    []
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
            Calculate Sum
          </button>
          <input
            type="text"
            value={sumValue}
            readOnly
            style={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ExpandTable = () => {
  const [sumValue, setSumValue] = useState(0); // State to hold the sum value

  const data = useMemo(
    () => [
      {
        profile: "Profile A",
        subRows: [
          {
            firstName: "Ervin",
            lastName: "Reinger",
            address: "566 Brakus Inlet",
          },
          {
            firstName: "Brittany",
            lastName: "McCullough",
            address: "722 Emie Stream",
          },
        ],
      },
      {
        profile: "Profile B",
        subRows: [
          {
            firstName: "Branson",
            lastName: "Frami",
            address: "32188 Larkin Turnpike",
          },
        ],
      },
    ],
    []
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
        accessorKey: "address",
        header: "Address",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    renderDetailPanel: ({ row }) => {
      const addresses = row.original.subRows || [];

      const calculateSum = () => {
        // Calculate the sum of the lengths of addresses
        const sum = addresses.reduce(
          (acc, subRow) => acc + subRow.address.length,
          0
        );
        setSumValue(sum); // Set the sum value on button click
      };

      return (
        <InnerTable
          addresses={addresses}
          onCalculateSum={calculateSum}
          sumValue={sumValue}
        />
      );
    },
  });

  return <MRT_TableContainer table={table} />;
};

export default ExpandTable;
