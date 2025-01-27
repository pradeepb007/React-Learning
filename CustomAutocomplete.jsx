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




import React, { useState } from "react";
import { styled } from "styled-components";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

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
  category: [
    { label: "Category 1", value: 1 },
    { label: "Category 2", value: 2 },
    { label: "Category 3", value: 3 },
  ],
  tags: [
    { label: "Tag 1", value: "t1" },
    { label: "Tag 2", value: "t2" },
    { label: "Tag 3", value: "t3" },
  ],
  status: [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ],
};

const DynamicFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (filterKey, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value, // Update the selected values for the given filterKey
    }));
  };

  return (
    <div>
      {Object.keys(filterOptions).map((filterKey) => (
        <div key={filterKey} style={{ marginBottom: "16px" }}>
          <h4>{filterKey.toUpperCase()}</h4>
          <StyledAutocomplete
            multiple
            options={filterOptions[filterKey]}
            getOptionLabel={(option) => option.label}
            value={selectedFilters[filterKey] || []} // Get the selected values for this filter
            onChange={(event, value) => handleFilterChange(filterKey, value)} // Handle changes dynamically
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Select ${filterKey}`}
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
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicFilters;







