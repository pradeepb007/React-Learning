import React, { useEffect, useMemo } from "react";
import { Box, Stack } from "@mui/material";
import { useWatch, useFormContext } from "react-hook-form";
import FormInputControl from "./FormItemControl";

const Step1Form = ({ control }) => {
  const { setValue, getValues } = useFormContext();
  const jsonData = {
    custId: 1234,
    typesData: {
      type1: ["subtype1", "subtype2", "subtype3"],
      type2: ["subtype4", "subtype5", "subtype6"],
    },
  };
  const typeOptions = Object.keys(jsonData.typesData).map((type) => ({
    label: type,
    value: type,
  }));

  const selectedType = useWatch({
    control,
    name: "customerType",
  });

  const currentSubType = useWatch({
    control,
    name: "customerSubType",
  });

  console.log("currentSubType", currentSubType);

  const subTypeOptions = useMemo(() => {
    if (selectedType && jsonData.typesData[selectedType]) {
      return jsonData.typesData[selectedType].map((subtype) => ({
        label: subtype,
        value: subtype,
      }));
    } else {
      return [];
    }
  }, [selectedType]);

  useEffect(() => {
    if (
      selectedType &&
      !jsonData.typesData[selectedType].includes(currentSubType)
    ) {
      setValue("customerSubType", "");
    }
  }, [selectedType, currentSubType]);

  const validateEndDate =
    (endDateField, startDateField) => (value, allValues) => {
      const startDate = allValues[startDateField];
      if (startDate && value && value.isBefore(startDate)) {
        return `${endDateField} should be after ${startDateField}`;
      }
      return true;
    };

  return (
    <Box component="div">
      <Stack direction="row" spacing={2}>
        <FormInputControl
          control={control}
          name="id"
          label="ID"
          type="text"
          isRequired={true}
          isDisabled={true}
          defaultValue={0}
        />
        <FormInputControl
          control={control}
          name="customerId"
          label="Cust ID"
          type="text"
          isRequired={true}
          isDisabled={true}
          defaultValue={1234567890}
        />
        <FormInputControl
          control={control}
          name="desc"
          label="Description"
          type="text"
          isRequired={true}
          rules={{
            validationType: "intValidation",
          }}
        />
      </Stack>

      <br />

      <Stack direction="row" spacing={2}>
        <FormInputControl
          control={control}
          name="startDate"
          label="Start Date"
          type="date"
          isRequired={true}
        />
        <FormInputControl
          control={control}
          name="endDate"
          label="End Date"
          type="date"
          isRequired={true}
          rules={{ validate: validateEndDate("End Date", "startDate") }}
        />
        <FormInputControl
          control={control}
          name="startDate2"
          label="Start Date2"
          type="date"
        />
        <FormInputControl
          control={control}
          name="endDate2"
          label="End Date2"
          type="date"
          rules={{ validate: validateEndDate("End Date2", "startDate2") }}
        />
      </Stack>
      <br />

      <Stack direction="row" spacing={2}>
        <FormInputControl
          control={control}
          name="customerType"
          label="Customer Type"
          type="select"
          isRequired={true}
          options={typeOptions}
        />

        <FormInputControl
          control={control}
          name="customerSubType"
          label="Customer Sub Type"
          type="select"
          isRequired={true}
          options={
            subTypeOptions.length
              ? subTypeOptions
              : [{ label: "Please select a type", value: "" }]
          }
          rules={{
            validate: (value) => (subTypeOptions.length ? !!value : true),
          }}
        />
      </Stack>

      <br />

      <Stack direction="row" spacing={2}>
        <FormInputControl
          control={control}
          name="demand"
          label="Demand"
          type="switch"
          isRequired={true}
        />
      </Stack>
    </Box>
  );
};

export default Step1Form;
