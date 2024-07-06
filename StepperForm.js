import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Container,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2";
import Step3Form from "./Step3";
import moment from "moment";

const steps = [
  "Personal Information",
  "Contact Details",
  "Address Information",
];

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm({ mode: "onTouched" });
  const { handleSubmit, trigger, control } = methods;

  const handleNext = async () => {
    const result = await trigger();
    if (result) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const formatDataForSubmit = (data) => {
    const formattedData = {};
    for (const key in data) {
      let value = data[key];

      if (data[key] !== "") {
        const field = control._fields[key];
        console.log("field", field._f.validationType);

        //  console.log("validationtype", data[key]);
        if (moment.isMoment(data[key])) {
          formattedData[key] = data[key].format("MM/DD/YYYY");
        } else if (field._f.validationType == "intValidation") {
          console.log("indie if int");
          formattedData[key] = parseInt(value, 10);
        } else {
          formattedData[key] = data[key];
        }
      } else {
        formattedData[key] = null;
      }
    }
    return formattedData;
  };

  const onSubmit = async (data) => {
    const formattedData = formatDataForSubmit(data);

    console.log("data", formattedData);
    // Handle form submission
    alert("Form submitted!");
  };

  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 6, mb: 2 }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 0 && <Step1Form control={control} />}
            {activeStep === 1 && <Step2Form control={control} />}
            {activeStep === 2 && <Step3Form control={control} />}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default StepperForm;
