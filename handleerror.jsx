iiconst handleInputChange = (newValue, rowIndex, accessorKey, helperMessage) => {
  setSubmitDisabled(true);
  let errorMessage;
  if (helperMessage) {
    errorMessage = helperMessage;
  } else {
    errorMessage = handleChangeValidate(newValue, validationRules[accessorKey]);
  }

  const updatedErrors = [...validationErrors];
  updatedErrors[rowIndex][accessorKey] = errorMessage !== undefined ? errorMessage : null;

  const updatedValues = [...updatedData.rows];
  updatedValues[rowIndex][accessorKey] = newValue;

  // Check if all error messages are the same
  const allErrorMessages = Object.values(updatedErrors[rowIndex]);
  const allErrorsSame = allErrorMessages.every((error) => error === allErrorMessages[0]);

  if (allErrorsSame && allErrorMessages[0] !== null) {
    // Clear all errors if they are the same
    for (let key in updatedErrors[rowIndex]) {
      updatedErrors[rowIndex][key] = null;
    }
  }

  if (accessorKey === 'event_type' && updatedErrors[rowIndex].event_subtype === 'Required') {
    updatedErrors[rowIndex].event_subtype = null;
  }

  if (accessorKey === 'event_subtype' && updatedErrors[rowIndex].event_type === 'Required') {
    updatedErrors[rowIndex].event_type = null;
  }

  if (accessorKey === 'event_type') {
    updatedErrors[rowIndex].event_subtype = 'Required';
  }

  setValidationErrors(updatedErrors);
  updatedValues[rowIndex][accessorKey] = newValue;
  return errorMessage;
};


const handleInputChange = (newValue, rowIndex, accessorKey, helperMessage) => {
  setSubmitDisabled(true);
  let errorMessage;
  if (helperMessage) {
    errorMessage = helperMessage;
  } else {
    errorMessage = handleChangeValidate(newValue, validationRules[accessorKey]);
  }

  const updatedErrors = [...validationErrors];
  updatedErrors[rowIndex][accessorKey] = errorMessage !== undefined ? errorMessage : null;

  const updatedValues = [...updatedData.rows];
  updatedValues[rowIndex][accessorKey] = newValue;

  // Check if all error messages are the same or null
  const errorMessages = Object.values(updatedErrors[rowIndex]);
  const uniqueErrors = new Set(errorMessages.filter(error => error !== null));
  const allErrorsSameOrNull = uniqueErrors.size <= 1;

  if (allErrorsSameOrNull) {
    // Clear all errors if they are the same or null
    for (let key in updatedErrors[rowIndex]) {
      updatedErrors[rowIndex][key] = null;
    }
  }

  if (accessorKey === 'event_type' && updatedErrors[rowIndex].event_subtype === 'Required') {
    updatedErrors[rowIndex].event_subtype = null;
  }

  if (accessorKey === 'event_subtype' && updatedErrors[rowIndex].event_type === 'Required') {
    updatedErrors[rowIndex].event_type = null;
  }

  if (accessorKey === 'event_type') {
    updatedErrors[rowIndex].event_subtype = 'Required';
  }

  setValidationErrors(updatedErrors);
  updatedValues[rowIndex][accessorKey] = newValue;
  return errorMessage;
};