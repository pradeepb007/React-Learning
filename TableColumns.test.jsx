import { renderHook, act } from "@testing-library/react-hooks";
import TableColumns from "./TableColumns";

describe("TableColumns", () => {
  const mockConvertLength = jest.fn((value) => value * 10);
  const mockHandleCellEdit = jest.fn();
  const selectedUnit = "cm";

  test("returns correct columns", () => {
    const { result } = renderHook(() =>
      TableColumns({
        selectedUnit,
        convertLength: mockConvertLength,
        handleCellEdit: mockHandleCellEdit,
        editedValues: {},
      })
    );

    const columns = result.current;

    // Test for all columns
    expect(columns).toHaveLength(5);

    // Check column headers
    const headers = ["Weeks", "Percentage", "Units", "Edit Units", "Final Unit"];
    headers.forEach((header, index) => {
      expect(columns[index].header).toBe(header);
    });
  });

  test("handles local change correctly", () => {
    const { result } = renderHook(() =>
      TableColumns({
        selectedUnit,
        convertLength: mockConvertLength,
        handleCellEdit: mockHandleCellEdit,
        editedValues: {},
      })
    );

    const columns = result.current;
    const editUnitColumn = columns.find((col) => col.accessorKey === "editedUnit");

    const row = { index: 0, original: { editedUnit: 5, active: true } };
    const column = { id: "editedUnit" };
    
    act(() => {
      editUnitColumn.muiEditTextFieldProps({ row, column }).onChange({
        target: { value: "20" }
      });
    });

    const cellValue = result.current.find(col => col.accessorKey === "editedUnit").muiEditTextFieldProps({ row, column }).value;
    expect(cellValue).toBe("20");
  });

  test("handles blur correctly", () => {
    const { result } = renderHook(() =>
      TableColumns({
        selectedUnit,
        convertLength: mockConvertLength,
        handleCellEdit: mockHandleCellEdit,
        editedValues: {},
      })
    );

    const columns = result.current;
    const editUnitColumn = columns.find((col) => col.accessorKey === "editedUnit");

    const row = { index: 0, original: { editedUnit: 5, active: true } };
    const column = { id: "editedUnit" };

    act(() => {
      editUnitColumn.muiEditTextFieldProps({ row, column }).onChange({
        target: { value: "20" }
      });
    });

    act(() => {
      editUnitColumn.onBlur({ row, column });
    });

    expect(mockHandleCellEdit).toHaveBeenCalledWith(0, "editedUnit", "20");
  });

  test("Cell renders converted value correctly", () => {
    const { result } = renderHook(() =>
      TableColumns({
        selectedUnit,
        convertLength: mockConvertLength,
        handleCellEdit: mockHandleCellEdit,
        editedValues: {},
      })
    );

    const columns = result.current;
    const unitColumn = columns.find((col) => col.accessorKey === "unit");

    const row = { original: { unit: 5 } };
    const column = { id: "unit" };

    const cellContent = unitColumn.Cell({ row, column });

    expect(mockConvertLength).toHaveBeenCalledWith(5, "cm");
    expect(cellContent).toBe(50); // Because mockConvertLength multiplies by 10
  });
});



import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import TableColumns from './TableColumns'; // Adjust the import path

const mockConvertLength = jest.fn((value, fromUnit, toUnit) => value);
const mockHandleCellEdit = jest.fn();
const selectedUnit = 'cm';

test('Cell renders converted value correctly', () => {
  const { result } = renderHook(() =>
    TableColumns({
      selectedUnit,
      convertLength: mockConvertLength,
      handleCellEdit: mockHandleCellEdit,
    })
  );

  const columns = result.current;
  const rowColumn = columns.filter((col) => typeof col.Cell === 'function');

  rowColumn.forEach((column) => {
    const cellProps = {
      cell: {
        getValue: jest.fn(() => {
          if (column.accessorKey === 'events') {
            return [
              { name: 'Event 1', startDate: '2024-07-29', endDate: '2024-07-30', subEvent: 'Sub Event 1', type: 'Type A' },
              { name: 'Event 2', startDate: '2024-07-31', endDate: '2024-08-01', subEvent: 'Sub Event 2', type: 'Type B' },
            ];
          }
          return 'Sample Value';
        }),
      },
    };

    if (column.accessorKey === 'percent') {
      // Code specific to 'percent' accessorKey
    } else {
      const { getByText } = render(<column.Cell {...cellProps} />);
      if (column.accessorKey === 'events') {
        // Check that EventList component is rendered correctly
        const event1 = getByText(/Event 1/);
        const event2 = getByText(/Event 2/);
        expect(event1).toBeInTheDocument();
        expect(event2).toBeInTheDocument();
      } else {
        const cellValue = getByText('Sample Value');
        expect(cellValue).toBeInTheDocument();
      }
    }
  });
});
