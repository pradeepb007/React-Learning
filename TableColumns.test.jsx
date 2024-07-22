import { renderHook } from "@testing-library/react-hooks";
import TableColumns from "./TableColumns";

describe("TableColumns", () => {
  const mockConvertLength = jest.fn((value, unit) => value * 10);
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
    const headers = [
      "Weeks",
      "Percentage",
      "Units",
      "Edit Units",
      "Final Unit",
    ];
    headers.forEach((header, index) => {
      expect(columns[index].header).toBe(header);
    });
  });

  test("should display converted values in 'Units' and 'Final Unit' columns", () => {
    const { result } = renderHook(() =>
      TableColumns({
        selectedUnit,
        convertLength: mockConvertLength,
        handleCellEdit: mockHandleCellEdit,
        editedValues: {},
      })
    );

    const columns = result.current;

    const rows = [
      {
        week: 1,
        percentage: 10,
        unit: 2,
        editedUnit: 2,
        finalUnit: 2,
        active: true,
      },
      {
        week: 2,
        percentage: 20,
        unit: 3,
        editedUnit: 3,
        finalUnit: 3,
        active: false,
      },
    ];

    rows.forEach((row, rowIndex) => {
      // Unit column
      const unitCell = columns[2].Cell({
        row: { original: row },
        column: columns[2],
      });
      expect(unitCell).toBe(row.unit * 10);

      // Final Unit column
      const finalUnitCell = columns[4].Cell({
        row: { original: row },
        column: columns[4],
      });
      expect(finalUnitCell).toBe(row.finalUnit * 10);
    });
  });

  test("should handle local value changes and blurs", () => {
    const { result } = renderHook(() =>
      TableColumns({
        selectedUnit,
        convertLength: mockConvertLength,
        handleCellEdit: mockHandleCellEdit,
        editedValues: {},
      })
    );

    const columns = result.current;

    const rowIndex = 0;
    const columnId = "editedUnit";
    const newValue = "50";

    // Simulate onChange event
    const editUnitColumn = columns[3];
    const onChangeProps = editUnitColumn.muiEditTextFieldProps({
      row: { index: rowIndex, original: {} },
      column: editUnitColumn,
    });

    onChangeProps.onChange({ target: { value: newValue } });

    // Simulate blur event
    onChangeProps.onBlur();

    // Ensure handleCellEdit is called on blur
    expect(mockHandleCellEdit).toHaveBeenCalledWith(
      rowIndex,
      columnId,
      newValue
    );
  });

  test("should reset local values when selectedUnit changes", () => {
    const { result, rerender } = renderHook(
      ({ selectedUnit }) =>
        TableColumns({
          selectedUnit,
          convertLength: mockConvertLength,
          handleCellEdit: mockHandleCellEdit,
          editedValues: {},
        }),
      {
        initialProps: { selectedUnit: "cm" },
      }
    );

    const columns = result.current;
    const rowIndex = 0;
    const columnId = "editedUnit";
    const newValue = "50";

    // Simulate onChange event
    const editUnitColumn = columns[3];
    const onChangeProps = editUnitColumn.muiEditTextFieldProps({
      row: { index: rowIndex, original: {} },
      column: editUnitColumn,
    });

    onChangeProps.onChange({ target: { value: newValue } });

    // Change selectedUnit and rerender
    rerender({ selectedUnit: "m" });

    // Local values should be reset, so the value should not be the new value
    expect(onChangeProps.value).not.toBe(newValue);
  });
});
