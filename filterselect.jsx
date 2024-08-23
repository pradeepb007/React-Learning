<div className="flex items-center gap-2 flex-wrap">
  {Object.keys(filterOptions).map((filterKey) => {
    const isSingleSelect = filterKey === 'yourSingleSelectKey'; // Replace with your actual key for single select
    return (
      <FormControl
        data-testid="filter-form-control"
        sx={{ mx: 0.7 }}
        key={filterKey}
        className="min-w-[120px] w-[154.8px] m-0" // temp fix for wrapping
        size="small"
      >
        <StyledAutocomplete
          multiple={!isSingleSelect} // Use multiple prop conditionally
          disableCloseOnSelect={!isSingleSelect} // Apply only for multi-select
          options={['All', ...(filterOptions[filterKey] || [])]}
          value={selectedFilters[filterKey] || []}
          onChange={handleFilterChange(filterKey)}
          loading={isLoading}
          size="small"
          noOptionsText="No options available"
          getOptionLabel={(option) => String(option)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={renderLabel(filterKey)}
              placeholder="Search..."
            />
          )}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              {!isSingleSelect && ( // Render checkbox only for multi-select
                <Checkbox
                  style={{ marginRight: 8 }}
                  checked={
                    option === 'All'
                      ? selectedFilters[filterKey].length === filterOptions[filterKey].length ||
                        selectedFilters[filterKey].length === filterOptions[filterKey].length + 1
                      : selected
                  }
                />
              )}
              {option}
            </li>
          )}
          isOptionEqualToValue={(option, value) => option === value}
          renderTags={() => null}
        />
      </FormControl>
    );
  })}
</div>