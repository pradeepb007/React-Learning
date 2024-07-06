import React from "react";
import { Box } from "@mui/material";
import FormInputControl from "./FormItemControl";

const Step2Form = ({ control }) => (
  <Box component="div">
    <FormInputControl
      control={control}
      name="type"
      label="type"
      type="text"
      isRequired={true}
    />
    <FormInputControl
      control={control}
      name="product"
      label="product"
      type="text"
    />
  </Box>
);

export default Step2Form;
