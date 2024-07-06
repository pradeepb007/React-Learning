import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  TextField,
  Switch,
  FormControlLabel,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers";

const FormItemControl = ({
  control,
  name,
  label,
  type,
  options,
  rules,
  isRequired,
  isDisabled,
  defaultValue,
}) => {
  const { clearErrors } = useFormContext();

  const getValidationRules = () => {
    let validationRules = rules;

    if (isRequired) {
      validationRules = {
        ...validationRules,
        required: `${label} is required`,
      };
    }

    if (rules && rules.validationType === "intValidation") {
      console.log("indie intvalidation");
      validationRules = {
        ...validationRules,
        pattern: {
          value: /^[+-]?\d+$/,
          message: "Only integer values are allowed",
        },
      };
    }
    if (rules && rules.validationType === "floatValidation") {
      validationRules = {
        ...validationRules,
        pattern: {
          value: /^[+-]?\d+(\.\d+)?$/,
          message: "Only float values are allowed",
        },
      };
    }
    return validationRules;
  };

  const renderField = (field, error) => {
    switch (type) {
      case "text":
      case "number":
        return (
          <TextField
            {...field}
            type={type}
            label={label}
            variant="outlined"
            fullWidth
            margin="normal"
            required={isRequired}
            disabled={isDisabled}
            error={!!error}
            helperText={error ? error.message : ""}
            value={field.value ?? ""}
            onChange={(e) => {
              field.onChange(e.target.value);
              clearErrors(name);
            }}
          />
        );
      case "select":
        return (
          <FormControl
            fullWidth
            variant="outlined"
            size="small"
            error={!!error}
          >
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                field.onChange(e.target.value);
                clearErrors(name);
              }}
              label={label}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        );
      case "switch":
        return (
          <FormControl error={!!error} component="fieldset">
            <FormControlLabel
              required={isRequired}
              control={
                <Switch
                  {...field}
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    clearErrors(name);
                  }}
                />
              }
              label={label}
            />
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        );
      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              {...field}
              label={label}
              onChange={(value) => {
                field.onChange(value);
                clearErrors(name);
              }}
              slotProps={{
                textField: {
                  variant: "outlined",
                  fullWidth: true,
                  margin: "normal",
                  required: isRequired,
                  error: !!error,
                  helperText: error ? error.message : "",
                },
              }}
            />
          </LocalizationProvider>
        );
      default:
        return null;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={
        defaultValue ??
        (type === "date" ? null : type === "switch" ? false : "")
      }
      rules={getValidationRules()}
      render={({ field, fieldState: { error } }) => renderField(field, error)}
    />
  );
};

export default FormItemControl;
