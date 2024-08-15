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
        accessorFn: (row) => `${row.updated_by}, ${row.updated_at}`,  // Display both values in the cell
        header: 'Updated by',
        filterVariant: 'autocomplete',  // Filter will use only 'updated_by'
        filterFn: (rows, id, filterValue) => rows.filter(row => row.original.updated_by === filterValue),  // Filter only by 'updated_by'
      },
  ], []);

  return columns;
};

export default ThresholdSettingsColumns;

import { renderHook } from '@testing-library/react-hooks';
import ThresholdSettingsColumns from './ThresholdSettingsColumns';

describe('ThresholdSettingsColumns', () => {
  test('returns correct columns', () => {
    const { result } = renderHook(() => ThresholdSettingsColumns());

    const columns = result.current;

    // Verify that the columns are correctly defined
    expect(columns).toHaveLength(8);  // Adjust if necessary

    // Check if the 'Updated by' column is correctly configured
    expect(columns[7].header).toBe('Updated by');

    // Verify the accessorFn returns both 'updated_by' and 'updated_at'
    const cellValue = columns[7].accessorFn({
      updated_by: 'User1',
      updated_at: '2024-08-01',
    });
    expect(cellValue).toBe('User1, 2024-08-01');

    // Verify the filter function filters by 'updated_by'
    const rows = [
      { original: { updated_by: 'User1', updated_at: '2024-08-01' } },
      { original: { updated_by: 'User2', updated_at: '2024-08-02' } },
    ];

    const filteredRows = columns[7].filterFn(rows, 'updated_by', 'User1');
    expect(filteredRows).toHaveLength(1);
    expect(filteredRows[0].original.updated_by).toBe('User1');
  });
});
