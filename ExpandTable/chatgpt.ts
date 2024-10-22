//MockData.jsx;
import React from "react";
import ExpandTable from "./ExpandTableData";

const MockData = () => {
  const expnadData = [
    {
      profile_id: "1",
      profile_name: "Profile A",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
    {
      profile_id: "2",
      profile_name: "Profile B",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
    {
      profile_id: "3",
      profile_name: "Profile C",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
    {
      profile_id: "4",
      profile_name: "Profile D",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
    {
      profile_id: "5",
      profile_name: "Profile E",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
    {
      profile_id: "6",
      profile_name: "Profile F",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },

    {
      profile_id: "7",
      profile_name: "Profile 12",
      customer_name: "123",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
    {
      profile_id: "8",
      profile_name: "Profile 123",
      customer_name: "12453",
      subRows: [
        {
          to_data: "Ervin",
          percentage: 20.3,
        },
        {
          to_data: "Brittany",
          percentage: 50,
        },
      ],
    },
  ];

  return (
    <div>
      <ExpandTable data={expnadData} />
    </div>
  );
};

export default MockData;

//ExpandTableData.jsx
import React from "react";
import {
  useMaterialReactTable,
  MRT_TableContainer,
} from "material-react-table";
import MainTableColumns from "./MainTableColumns";
import InnerTable from "./InnerTable";
import { Button } from "@mui/material";

const ExpandTable = ({ data }) => {
  console.log("data", data);
  const handleChange = () => {
    console.log("test");
  };

  const handleSubmit = () => {
    console.log("updated data");
  };

  const table = useMaterialReactTable({
    columns: MainTableColumns({ handleChange }),
    data: data,
    enableEditing: true,
    editDisplayMode: "table",
    renderDetailPanel: ({ row }) => {
      const subData = row.original.subRows || [];
      return <InnerTable subData={subData} />;
    },
  });

  return (
    <>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      <MRT_TableContainer table={table} />
    </>
  );
};

export default ExpandTable;

//MainTableColumns.jsx
import React, { useMemo } from "react";
import InputText from "./InputText";

const MainTableColumns = (handleChange) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "profile_name",
        header: "Profile Name",
        enableEditing: true,
        Edit: ({ column, row }) => {
          return (
            <InputText
              row={row}
              column={column}
              isRequired={true}
              handleInputChange={handleChange}
            />
          );
        },
      },
      {
        accessorKey: "customer_name",
        header: "customer Name",
        enableEditing: true,
        Edit: ({ column, row }) => {
          return (
            <InputText
              row={row}
              column={column}
              isRequired={true}
              handleInputChange={handleChange}
            />
          );
        },
      },
      {
        accessorKey: "to_data",
        header: "To Data",
        enableEditing: false,
      },
      {
        accessorKey: "percentage",
        header: "Percentage",
        enableEditing: false,
      },
    ],

    [handleChange]
  );
  return columns;
};

export default MainTableColumns;

//InnerTable.jsx
import {
  useMaterialReactTable,
  MRT_TableContainer,
} from "material-react-table";
import InnerTableColumns from "./InnerTableColumns";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

// Inner table component
const InnerTable = ({ subData }) => {
  const [data, setData] = useState(subData);
  const [sumValue, setSumValue] = useState(0);

  useEffect(() => {
    const sum = data.reduce((acc, item) => acc + item.percentage, 0);
    setSumValue(sum);
  }, [data]);

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
      percentage: 0,
    };
    setData([...data, newRow]);
  };

  const handleChange = () => {
    console.log("test");
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
//InnerTableColumns.jsx
import React, { useMemo } from "react";
import InputText from "./InputText";

const InnerTableColumns = (handleChange) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "profile_name",
        header: "Profile Name",
        enableEditing: false,
      },
      {
        accessorKey: "customer_name",
        header: "customer Name",
        enableEditing: false,
      },
      {
        accessorKey: "to_data",
        header: "To Data",
        Edit: ({ column, row }) => {
          return (
            <InputText
              row={row}
              column={column}
              isRequired={true}
              handleInputChange={handleChange}
            />
          );
        },
      },
      {
        accessorKey: "percentage",
        header: "Percentage",
        Edit: ({ column, row }) => {
          return (
            <InputText
              row={row}
              column={column}
              isRequired={true}
              handleInputChange={handleChange}
            />
          );
        },
      },
    ],

    [handleChange]
  );
  return columns;
};

export default InnerTableColumns;


BAsed on above componets.. 

1. Equalize button and add row buttons working fine.. but when we equalize, table data is updating with updated values .. but not showing on table cell.. table cell only showing defalut Data..

2. Need Submit function functionality..  need payload data same as expnadData but need only edited profile_ids.. if user only update profile_id 1 data with subrows than on submit need only profile_id 1 data.. not profile 2 data.. even if we ahve paginated data