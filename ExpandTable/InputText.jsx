import React from "react";
import { TextField } from "@mui/material";

const InputText = ({ value, onChange, isRequired }) => {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={isRequired}
      variant="standard"
      fullWidth
    />
  );
};

export default InputText;
