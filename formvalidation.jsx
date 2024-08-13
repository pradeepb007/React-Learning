const validateEntry = (newEntry, tableData) => {
  // Iterate over each row in the table data
  for (const row of tableData) {
    // Check if all fields in the row match the new entry, ignoring null/undefined values
    const isMatch = (
      (newEntry.category === row.category || !newEntry.category) &&
      (newEntry.subcategory === row.subcategory || !newEntry.subcategory) &&
      (newEntry.type === row.type || !newEntry.type) &&
      (newEntry.subtype === row.subtype || !newEntry.subtype)
    );

    // If a match is found, return a message
    if (isMatch) {
      let path = [];
      if (newEntry.category) path.push('category');
      if (newEntry.subcategory) path.push('subcategory');
      if (newEntry.type) path.push('type');
      if (newEntry.subtype) path.push('subtype');
      return `Record already exists with path: ${path.join('/')}`;
    }
  }

  // If no match is found, return null (no error)
  return null;
};

const handleSubmit = (newEntry) => {
  const validationMessage = validateEntry(newEntry, tableData);

  if (validationMessage) {
    alert(validationMessage);
  } else {
    // Proceed to add the new entry to the table
    tableData.push(newEntry);
    // Handle successful submission (e.g., close the popup, refresh the table)
  }
};