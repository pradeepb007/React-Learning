const ThresholdSettingsColumns = () => {
  const columns = useMemo(() => [
    { accessorKey: 'subsector', header: 'Subsector' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'brand', header: 'Brand' },
    { accessorKey: 'brand_form', header: 'Brand form' },
    { accessorKey: 'compare_with', header: 'Compare with', filterVariant: 'select' },
    { accessorKey: 'operation_type', header: 'Operation type', filterVariant: 'select' },
    { accessorKey: 'value', header: 'Value', size: 100 },
    { accessorKey: 'unit', header: 'Unit', size: 50 },
    {
      accessorFn: (row) => row.updated_by,  // Updated to only return 'updated_by'
      header: 'Updated by',
      filterVariant: 'autocomplete',  // Assuming autocomplete variant is used
      filterFn: (rows, id, filterValue) => rows.filter(row => row.values[id] === filterValue),
    },
  ], []);

  return columns;
};

export default ThresholdSettingsColumns;


import { renderHook } from '@testing-library/react-hooks';
import ThresholdSettingsColumns from './ThresholdSettingsColumns';

describe('ThresholdSettingsColumns', () => {
  test('returns correct columns', () => {
    const validationErrors = {};
    const handleChange = jest.fn();

    const { result } = renderHook(() => ThresholdSettingsColumns(validationErrors, handleChange));

    const columns = result.current;

    // Verify that the columns are correctly defined
    expect(columns).toHaveLength(9);

    // Check if the first column is 'Subsector'
    expect(columns[0].accessorKey).toBe('subsector');
    expect(columns[0].header).toBe('Subsector');

    // Check if the last column uses 'updated_by' only
    expect(columns[8].header).toBe('Updated by');
    expect(columns[8].accessorFn({ updated_by: 'User1', updated_at: '2024-08-01' })).toBe('User1');
    expect(columns[8].filterVariant).toBe('autocomplete');
  });

  test('filter only contains updated_by values', () => {
    const validationErrors = {};
    const handleChange = jest.fn();

    const { result } = renderHook(() => ThresholdSettingsColumns(validationErrors, handleChange));

    const columns = result.current;
    const filterFn = columns[8].filterFn;

    const rows = [
      { values: { updated_by: 'User1' } },
      { values: { updated_by: 'User2' } },
    ];

    // Test the filter function
    const filteredRows = filterFn(rows, 'updated_by', 'User1');
    expect(filteredRows).toHaveLength(1);
    expect(filteredRows[0].values.updated_by).toBe('User1');
  });
});

