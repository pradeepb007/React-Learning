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

    const cellValue = editUnitColumn.muiEditTextFieldProps({ row, column }).value;
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

export default TableColumns;
