import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";
import { Button } from "@mui/material";

// Styled Autocomplete Wrapper
const StyledAutocomplete = styled(Autocomplete)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  & .MuiOutlinedInput-root.Mui-focused {
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }

  & .MuiChip-root {
    background-color: #007bff;
    color: white;
    font-weight: bold;
    margin: 4px;
    &:hover {
      background-color: #0056b3;
    }
  }
`;

// Styled Clear All Button
const StyledButton = styled(Button)`
  margin-top: 8px;
  background-color: #ff5c5c;
  color: white;
  &:hover {
    background-color: #ff3c3c;
  }
`;

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
  { label: "Option 4", value: 4 },
  { label: "Option 5", value: 5 },
];

const CustomAutocomplete = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event, value) => {
    setSelectedOptions(value);
    console.log("Selected:", value);
  };

  const handleClearAll = () => {
    setSelectedOptions([]);
    console.log("Cleared all selected values");
  };

  return (
    <div>
      <StyledAutocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option.label}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField
            {...params}
            label="Custom Autocomplete"
            variant="outlined"
          />
        )}
        renderTags={(value, getTagProps) => {
          // Limit the number of visible chips to 2
          const displayedChips = value.slice(0, 2);
          const extraCount = value.length - displayedChips.length;

          return (
            <>
              {displayedChips.map((option, index) => (
                <Chip
                  key={index}
                  label={option.label}
                  {...getTagProps({ index })}
                  size="small"
                  variant="outlined"
                />
              ))}
              {extraCount > 0 && (
                <Chip
                  label={`+${extraCount}`}
                  size="small"
                  style={{ backgroundColor: "#e0e0e0", fontWeight: "bold" }}
                />
              )}
            </>
          );
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option.value}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBox fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        )}
        onChange={handleChange}
        value={selectedOptions}
      />
      <StyledButton variant="contained" onClick={handleClearAll}>
        Clear All
      </StyledButton>
    </div>
  );
};

export default CustomAutocomplete;


import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

// Styled Component for Autocomplete
const StyledAutocomplete = styled(Autocomplete)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  & .MuiOutlinedInput-root.Mui-focused {
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }

  & .MuiChip-root {
    background-color: #007bff;
    color: white;
    font-weight: bold;
    margin: 4px;
    &:hover {
      background-color: #0056b3;
    }
  }
`;

const filterOptions = {
  category: ["Category 1", "Category 2", "Category 3"],
  tags: ["Tag 1", "Tag 2", "Tag 3"],
  status: [],
};

const DynamicFilters = ({ selectedFilters, handleFilterChange }) => {
  // Handle "All" option selection
  const handleAllChange = (filterKey) => {
    // If "All" is selected, set all options as selected
    const allSelected = filterOptions[filterKey];
    handleFilterChange(filterKey, allSelected);
  };

  // Handle deselecting "All" option
  const handleDeselectAll = (filterKey) => {
    // Clear all selections if "All" is deselected
    handleFilterChange(filterKey, []);
  };

  // Handle individual selection and unselection
  const handleIndividualChange = (filterKey, event, value, reason) => {
    // Handle when "All" is selected or deselected
    if (reason === "selectOption" && value.includes("All")) {
      handleAllChange(filterKey); // Select all options
    } else if (reason === "removeOption" && value.includes("All")) {
      handleDeselectAll(filterKey); // Deselect all options
    } else {
      // Handle individual selections
      handleFilterChange(filterKey, value);
    }
  };

  return (
    <div>
      {Object.keys(filterOptions).map((filterKey) => (
        <div key={filterKey} style={{ marginBottom: "16px" }}>
          <h4>{filterKey.toUpperCase()}</h4>
          <StyledAutocomplete
            multiple
            options={
              filterOptions[filterKey].length > 0
                ? ["All", ...filterOptions[filterKey]]
                : []
            } // Add "All" option or no options
            value={selectedFilters[filterKey] || []} // Get the selected values for this filter
            onChange={(event, value, reason) => {
              handleIndividualChange(filterKey, event, value, reason);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Select ${filterKey}`}
                variant="outlined"
              />
            )}
            renderOption={(props, option, state) => {
              const isAllSelected =
                selectedFilters[filterKey]?.length ===
                filterOptions[filterKey].length;
              const isOptionSelected =
                selectedFilters[filterKey]?.includes(option);
              const isChecked =
                option === "All" ? isAllSelected : isOptionSelected;

              return (
                <li {...props}>
                  <Checkbox checked={isChecked} tabIndex={-1} disableRipple />
                  <ListItemText primary={option} />
                </li>
              );
            }}
            renderTags={(value, getTagProps) => {
              // Limit the number of visible chips to 2
              const displayedChips = value.slice(0, 2);
              const extraCount = value.length - displayedChips.length;

              return (
                <>
                  {displayedChips.map((option, index) => (
                    <Chip
                      key={index}
                      label={option}
                      {...getTagProps({ index })}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                  {extraCount > 0 && (
                    <Chip
                      label={`+${extraCount}`}
                      size="small"
                      style={{ backgroundColor: "#e0e0e0", fontWeight: "bold" }}
                    />
                  )}
                </>
              );
            }}
            // Handle case when no options are available
            noOptionsText="No options available"
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicFilters;






