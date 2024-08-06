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

    const transformMessages = (messagesArray) => {
      return messagesArray?.reduce((acc, { field, error }) => {
        acc[field] = error;
        return acc;
      }, {});
    };

    const transformedErrors = transformMessages(response?.errors);
    const transformedWarnings = transformMessages(response?.warnings);

    const handleFieldMessages = (messages) => {
      for (const field in messages) {
        setError(field, { type: "server", message: messages[field] });
      }

      const fieldIndices = [];
      Object.keys(stepFileds).forEach((index) => {
        if (stepFileds[index].some((field) => messages[field])) {
          fieldIndices.push(parseInt(index));
        }
      });

      setStepErrors((prevErrors) => ({
        ...prevErrors,
        ...fieldIndices.reduce((acc, index) => {
          acc[index] = true;
          return acc;
        }, {}),
      }));

      const stepNumbers = fieldIndices.map((index) => `Step ${index + 1}`);
      return stepNumbers.join(", ");
    };

    if (Object.keys(transformedErrors).length > 0) {
      const errorMessage = handleFieldMessages(transformedErrors);

      setIsSnackOpen(true);
      setSnackBar({
        message: <span>Error {errorMessage}</span>,
      });
    } else if (Object.keys(transformedWarnings).length > 0) {
      const warningMessage = handleFieldMessages(transformedWarnings);

      // Show popup for warnings confirmation
      const confirmSubmit = window.confirm(`There are warnings in ${warningMessage}. Do you want to proceed?`);
      if (confirmSubmit) {
        try {
          await addNewrecord(formattedData);
          handleclose(null, "add");
        } catch (error) {
          setIsLoading(false);
          // Handle any errors during re-submission if needed
        }
      }
    }
  }
};
