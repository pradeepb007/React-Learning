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


import React, { useState, useEffect } from "react";
import { Box, Checkbox, FormControlLabel, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { getSettings, updateSettings, toggleSetting } from "./settingsSlice";

const stepFields = {
  0: ["id", "firstname", "lastname"],
  1: ["email", "phone"],
  2: ["address"],
};

const Settings = () => {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  const handleCheckboxChange = (field) => {
    dispatch(toggleSetting({ field }));
  };

  const handleSave = () => {
    dispatch(updateSettings(settings));
  };

  return (
    <Box>
      <h1>Settings</h1>
      {Object.keys(stepFields).map((step) => (
        <Accordion key={step}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Step {parseInt(step) + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {stepFields[step].map((field) => (
              <FormControlLabel
                key={field}
                control={
                  <Checkbox
                    checked={settings[field] || false}
                    onChange={() => handleCheckboxChange(field)}
                  />
                }
                label={field}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default Settings;

