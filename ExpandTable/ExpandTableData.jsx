//ExpandTableData.jsx
import React, { useState } from "react";
import {
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_TablePagination,
} from "material-react-table";
import MainTableColumns from "./MainTableColumns";
import InnerTable from "./InnerTable";
import { Button } from "@mui/material";

const ExpandTable = ({ data, setData }) => {
  const [editedProfiles, setEditedProfiles] = useState(new Set());
  const handleChange = () => {
    console.log("test");
  };

  // Handle changes from the main table
  const handleMainChange = (profileId, field, value) => {
    setData((prevData) =>
      prevData.map((profile) =>
        profile.profile_id === profileId
          ? { ...profile, [field]: value }
          : profile
      )
    );
    setEditedProfiles((prev) => new Set(prev).add(profileId));
  };

  // Handle changes from the inner tables
  const handleInnerDataChange = (profileId, updatedSubRows) => {
    setData((prevData) =>
      prevData.map((profile) =>
        profile.profile_id === profileId
          ? { ...profile, subRows: updatedSubRows }
          : profile
      )
    );
    setEditedProfiles((prev) => new Set(prev).add(profileId));
  };

  // Submit function to gather only edited profiles
  const handleSubmit = () => {
    const payload = data.filter((profile) =>
      editedProfiles.has(profile.profile_id)
    );
    console.log("Payload:", payload);
    // TODO: Implement actual submission logic (e.g., API call)
  };

  const table = useMaterialReactTable({
    columns: MainTableColumns({ handleChange }),
    data: data,
    enableEditing: true,
    editDisplayMode: "table",
    renderDetailPanel: ({ row }) => {
      const subData = row.original.subRows || [];
      return (
        <InnerTable
          subData={subData}
          onDataChange={(updatedSubRows) =>
            handleInnerDataChange(row.original.profile_id, updatedSubRows)
          }
        />
      );
    },
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  return (
    <>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      <MRT_TableContainer table={table} />
      <MRT_TablePagination table={table} />
    </>
  );
};

export default ExpandTable;
