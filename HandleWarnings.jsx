import { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';

const [validationErrors, setValidationErrors] = useState({});
const [showWarningDialog, setShowWarningDialog] = useState(false);
const [isDataLoading, setIsDataLoading] = useState(false);
const [submitDisabled, setSubmitDisabled] = useState(true);
const [isSnackOpen, setIsSnackOpen] = useState(false);
const [snackBar, setSnackBar] = useState({ message: '', severity: '' });
const [updatedData, setUpdatedData] = useState({ rows: [] });

const updateData = (data) => {
    setTableData(data.rows || []);
    const errors = data.rows.map((row) => row.validation_errors || {});
    const warnings = data.rows.map((row) => row.validation_warnings || {});

    const hasErrors = errors.some(error => Object.keys(error).length > 0);
    const hasWarnings = warnings.some(warning => Object.keys(warning).length > 0);

    if (!hasErrors && hasWarnings) {
        setValidationErrors(warnings);       
    } else {
        setValidationErrors(errors);       
    }
};

useEffect(() => {
    fetchData();
}, [responseData]);

const allErrorsNull = Object.values(validationErrors).every((error) => 
    Object.keys(error).length === 0
);

const handleValidate = async () => {
    setIsDataLoading(true);

    if (!allErrorsNull) return;

    try {
        const updatedRows = updatedData.rows.map((row) => {
            const { validations, validation_warnings, ...rest } = row;
            return rest;
        });

        const updatedState = { ...updatedData, rows: updatedRows };
        const response = await promoGridValidate(updatedState);

        setIsDataLoading(false);
        
        // Assuming response contains updated rows with validation warnings
        const validationWarnings = response.rows.map(row => row.validation_warnings || {});
        const hasWarnings = validationWarnings.some(warning => Object.keys(warning).length > 0);

        if (hasWarnings) {
            setUpdatedData(response);  // Update the state with the response
            setShowWarningDialog(true);
        } else {
            setSubmitDisabled(false);
            setIsSnackOpen(true);
            setSnackBar({
                message: "Validation successful. You can proceed to submit.",
                severity: 'success'
            });
        }
    } catch (error) {
        updateData(error.response.data);
        setIsDataLoading(false);
        setSubmitDisabled(true);
        setIsSnackOpen(true);
        setSnackBar({
            message: "Validation failed. Please fix the errors.",
            severity: 'error'
        });
    }
};

const handleWarningDialogClose = (proceed) => {
    setShowWarningDialog(false);
    if (proceed) {
        setSubmitDisabled(false);
        setIsSnackOpen(true);
        setSnackBar({
            message: "Validation successful. You can proceed to submit.",
            severity: 'success'
        });
    }
};

<Button 
  onClick={handleValidate} 
  disabled={!allErrorsNull || isDataLoading}
>
  Validate
</Button>

<Dialog
  open={showWarningDialog}
  onClose={() => handleWarningDialogClose(false)}
>
  <DialogTitle>Validation Warnings</DialogTitle>
  <DialogContent>
    <DialogContentText>
      There are warnings in the data. Do you want to proceed with submission?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => handleWarningDialogClose(false)} color="primary">
      No
    </Button>
    <Button onClick={() => handleWarningDialogClose(true)} color="primary" autoFocus>
      Yes
    </Button>
  </DialogActions>
</Dialog>

// Snackbar component to display messages
<Snackbar
  open={isSnackOpen}
  autoHideDuration={6000}
  onClose={() => setIsSnackOpen(false)}
  message={snackBar.message}
  severity={snackBar.severity}
/>
