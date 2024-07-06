import React from "react";
import { Box } from "@mui/material";
import FormInputControl from "./FormItemControl";

const Step3Form = ({ control }) => (
  <Box component="div">
    <FormInputControl
      control={control}
      name="address"
      label="Address"
      type="text"
    />
    <FormInputControl control={control} name="city" label="City" type="text" />
  </Box>
);

export default Step3Form;
