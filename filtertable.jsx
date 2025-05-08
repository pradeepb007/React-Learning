import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Typography,
  Box
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Close';

const levelKeys = ['subsector', 'category', 'brand', 'brandform'];

const FilterTable = ({
  columnFilterOptions,
  selectedFilters,
  handleFilterChange,
  setSelectedFilters
}) => {
  // Determine which levels are currently active (i.e., have options or are selected)
  const activeLevels = levelKeys.filter(
    (key, index) =>
      index === 0 || selectedFilters[levelKeys[index - 1]] // Only show if parent is selected
  );

  // Get max number of rows to render based on the current options at the deepest active level
  const getMaxRows = () => {
    for (let i = levelKeys.length - 1; i >= 0; i--) {
      const key = levelKeys[i];
      if (selectedFilters[key] || columnFilterOptions[key]?.length) {
        return columnFilterOptions[key]?.length || 0;
      }
    }
    return 0;
  };

  const maxRows = getMaxRows();

  const handleClear = (key) => {
    const updated = { ...selectedFilters };
    const index = levelKeys.indexOf(key);
    levelKeys.slice(index).forEach((k) => {
      updated[k] = null;
    });
    setSelectedFilters(updated);
    handleFilterChange(key, null); // Triggers backend fetch
  };

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {activeLevels.map((key) => (
              <TableCell key={key}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle2" fontWeight="bold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Typography>
                  <Tooltip title={`Clear ${key}`}>
                    <IconButton size="small" onClick={() => handleClear(key)}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.from({ length: maxRows }).map((_, rowIdx) => (
            <TableRow key={rowIdx}>
              {activeLevels.map((key, colIdx) => {
                const parentKey = levelKeys[colIdx - 1];
                const isSelectable = colIdx === 0 || selectedFilters[parentKey];
                const options = columnFilterOptions[key] || [];
                const value = options[rowIdx] || '';

                return (
                  <TableCell
                    key={key}
                    sx={{ cursor: isSelectable && value ? 'pointer' : 'default' }}
                    onClick={() => {
                      if (isSelectable && value) handleFilterChange(key, value);
                    }}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default FilterTable;
