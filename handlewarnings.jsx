const onSubmit = async (data) => {
  setIsLoading(true);
  const formattedData = formatDataForSubmit(data);
  
  try {
    await addNewrecord(formattedData);
    setIsLoading(false);
    handleclose(null, "add");
  } catch (error) {
    setIsLoading(false);
    const response = error.response?.data;

    const transformErrors = (responseArray) => {
      return responseArray?.reduce((acc, { field, error }) => {
        acc[field] = error;
        return acc;
      }, {});
    };

    const transformedErrors = transformErrors(response?.errors);
    const transformedWarnings = transformErrors(response?.warnings);

    if (Object.keys(transformedErrors).length > 0) {
      // Process errors
      for (const field in transformedErrors) {
        setError(field, { type: "server", message: transformedErrors[field] });
      }

      const errorFiledIndices = [];
      Object.keys(stepFileds).forEach((index) => {
        if (stepFileds[index].some((field) => transformedErrors[field])) {
          errorFiledIndices.push(parseInt(index));
        }
      });

      setStepErrors((prevErrors) => ({
        ...prevErrors,
        ...errorFiledIndices.reduce((acc, index) => {
          acc[index] = true;
          return acc;
        }, {}),
      }));

      const stepNumbers = errorFiledIndices.map((index) => {
        return `Step ${index + 1}`;
      });
      const errorMessage = stepNumbers.join(", ");

      setIsSnackOpen(true);
      setSnackBar({
        message: <span>Error {errorMessage}</span>,
      });
    } else if (Object.keys(transformedWarnings).length > 0) {
      // Process warnings if no errors
      for (const field in transformedWarnings) {
        setWarning(field, { type: "warning", message: transformedWarnings[field] });
      }

      const warningFiledIndices = [];
      Object.keys(stepFileds).forEach((index) => {
        if (stepFileds[index].some((field) => transformedWarnings[field])) {
          warningFiledIndices.push(parseInt(index));
        }
      });

      setStepWarnings((prevWarnings) => ({
        ...prevWarnings,
        ...warningFiledIndices.reduce((acc, index) => {
          acc[index] = true;
          return acc;
        }, {}),
      }));

      const stepNumbers = warningFiledIndices.map((index) => {
        return `Step ${index + 1}`;
      });
      const warningMessage = stepNumbers.join(", ");

      // Show popup for warnings confirmation
      const confirmSubmit = window.confirm(`There are warnings in ${warningMessage}. Do you want to proceed?`);
      if (confirmSubmit) {
        // Re-submit the data ignoring warnings
        await addNewrecord(formattedData);
        handleclose(null, "add");
      }
    }
  }
};
