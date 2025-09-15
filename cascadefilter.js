const fullData = [
  {
    "ProductGroupName": "group1",
    "MaterialID": "_mm_id",
    "MaterialType": "__TEST_material_type",
    "SubSector": "a",
    "Category": "b",
    "Brand": "c",
    "BaseUnitOfMeasure": "kg"
  },
  {
    "ProductGroupName": "group1",
    "MaterialID": "_mm_id2",
    "MaterialType": "FERT1",
    "SubSector": "Chemicals1",
    "Category": "Alcohols & Related Products",
    "Brand": "Alcohols Stearyl",
    "BaseUnitOfMeasure": "LT"
  },
  {
    "ProductGroupName": "group3",
    "MaterialID": "10220233",
    "MaterialType": "FERT2",
    "SubSector": "Chemicals2",
    "Category": "Alcohols & Related Products",
    "Brand": "Alcohols Stearyl",
    "BaseUnitOfMeasure": "LT"
  },
  {
    "ProductGroupName": "group4",
    "MaterialID": "10220238",
    "MaterialType": "FERT1",
    "SubSector": "Chemicals1",
    "Category": "Alcohols & Related Products",
    "Brand": "Alcohols Stearyl",
    "BaseUnitOfMeasure": "LT"
  }
]; 

// const filters = {
//   MaterialID: [{ id: 0, name: "_mm_id", value: "_mm_id" }, 
//   { id: 1, name: "_mm_id2", value: "_mm_id2" }]
// };

// const filters = {
//   MaterialID: [{ id: 0, name: "_mm_id", value: "_mm_id" }, 
//   { id: 1, name: "_mm_id2", value: "_mm_id2" }],
//   ProductGroupName: [{ id: 0, name: "group1", value: "group1" }]
// };

const filters = {
  MaterialID: [{ id: 0, name: "_mm_id", value: "_mm_id" }, 
  { id: 1, name: "_mm_id2", value: "_mm_id2" }],
 ProductGroupName: [{ id: 0, name: "group1", value: "group1" }],
 MaterialType: [{ id: 0, name: "FERT1", value: "FERT1" }]
};


function getFilterOptions(fullData, filters) {
  if (!fullData || fullData.length === 0) return {};

  // helper: unique values in original order
  const uniqueValues = (data, field) => {
    const seen = new Set();
    const out = [];
    for (const row of data) {
      const v = row[field];
      if (v != null && !seen.has(v)) {
        seen.add(v);
        out.push(v);
      }
    }
    return out;
  };

  const allFields = Object.keys(fullData[0]);
  const selectedKeys = Object.keys(filters || {}); // insertion order = selection order

  // Build snapshot options for each selected key based on previous selections only
  const snapshots = {};
  for (let i = 0; i < selectedKeys.length; i++) {
    const key = selectedKeys[i];

    // apply only previous selected keys to fullData
    let filteredByPrev = fullData;
    for (let j = 0; j < i; j++) {
      const prevKey = selectedKeys[j];
      const prevVals = (filters[prevKey] || []).map(f => f.value);
      if (prevVals.length) {
        filteredByPrev = filteredByPrev.filter(r => prevVals.includes(r[prevKey]));
      }
    }

    const snapVals = uniqueValues(filteredByPrev, key); // values available when key was selected
    const selectedVals = (filters[key] || []).map(f => f.value);

    // Put selected values first (in the same order they appear in filters[key]),
    // then append remaining snapshot values (no duplicates)
    const seen = new Set();
    const combined = [];
    for (const v of selectedVals) {
      if (!seen.has(v)) { seen.add(v); combined.push(v); }
    }
    for (const v of snapVals) {
      if (!seen.has(v)) { seen.add(v); combined.push(v); }
    }

    snapshots[key] = combined.map((v, idx) => ({ id: idx, name: String(v), value: v }));
  }

  // Build totalFiltered = apply ALL selected filters cumulatively
  let totalFiltered = fullData;
  for (const key of selectedKeys) {
    const vals = (filters[key] || []).map(f => f.value);
    if (vals.length) totalFiltered = totalFiltered.filter(r => vals.includes(r[key]));
  }

  // Final result: selected keys use their snapshots; others use totalFiltered unique values
  const result = {};
  for (const field of allFields) {
    if (selectedKeys.includes(field)) {
      result[field] = snapshots[field];
    } else {
      const vals = uniqueValues(totalFiltered, field);
      result[field] = vals.map((v, idx) => ({ id: idx, name: String(v), value: v }));
    }
  }

  return result;
}



function getFilterOptions(fullData, filters) {
  if (!fullData || fullData.length === 0) return {};

  const uniqueValues = (data, field) => {
    const seen = new Set();
    const out = [];
    for (const row of data) {
      const v = row[field];
      if (v != null && !seen.has(v)) {
        seen.add(v);
        out.push(v);
      }
    }
    return out;
  };

  const allFields = Object.keys(fullData[0]);
  const selectedKeys = Object.keys(filters || {});

  const snapshots = {};
  for (let i = 0; i < selectedKeys.length; i++) {
    const key = selectedKeys[i];

    let filteredByPrev = fullData;
    for (let j = 0; j < i; j++) {
      const prevKey = selectedKeys[j];
      const prevVals = (filters[prevKey] || []).map(f => f.value);
      if (prevVals.length) {
        filteredByPrev = filteredByPrev.filter(r => prevVals.includes(r[prevKey]));
      }
    }

    const snapVals = uniqueValues(filteredByPrev, key);
    const selectedItems = filters[key] || [];

    // preserve selected ids
    const selectedVals = selectedItems.map(f => f.value);
    const seen = new Set();
    const combined = [];

    for (const item of selectedItems) {
      if (!seen.has(item.value)) {
        seen.add(item.value);
        combined.push(item); // keep original {id, name, value}
      }
    }
    for (const v of snapVals) {
      if (!seen.has(v)) {
        seen.add(v);
        combined.push({ id: combined.length, name: String(v), value: v });
      }
    }

    snapshots[key] = combined;
  }

  let totalFiltered = fullData;
  for (const key of selectedKeys) {
    const vals = (filters[key] || []).map(f => f.value);
    if (vals.length) totalFiltered = totalFiltered.filter(r => vals.includes(r[key]));
  }

  const result = {};
  for (const field of allFields) {
    if (selectedKeys.includes(field)) {
      result[field] = snapshots[field];
    } else {
      const vals = uniqueValues(totalFiltered, field);
      result[field] = vals.map((v, idx) => ({ id: idx, name: String(v), value: v }));
    }
  }

  return result;
}



console.log(getFilterOptions(fullData, filters));
