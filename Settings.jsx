import React, { useState, useEffect } from "react";
import { Box, Checkbox, FormControlLabel, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSettings, updateSettings } from "../redux/actions/settingsActions";

const Settings = () => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);

  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleCheckboxChange = (field) => {
    setLocalSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    dispatch(updateSettings(localSettings));
  };

  return (
    <Box>
      <h1>Settings</h1>
      {Object.keys(stepFields).map((step) => (
        <Box key={step} mb={3}>
          <Typography variant="h6">{`Step ${parseInt(step) + 1}`}</Typography>
          {stepFields[step].map((field) => (
            <FormControlLabel
              key={field}
              control={
                <Checkbox
                  checked={localSettings[field]}
                  onChange={() => handleCheckboxChange(field)}
                />
              }
              label={field}
            />
          ))}
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default Settings;
