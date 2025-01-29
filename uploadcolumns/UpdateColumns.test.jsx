import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UpdateColumns from "./UpdateColumns"; // Adjust the import based on your file structure

describe("UpdateColumns", () => {
  const mockOnColumnVisibilityChange = jest.fn();
  const mockOnColumnReorder = jest.fn();
  const mockOnColumnPin = jest.fn();

  const columns = [
    { id: "col1", header: "Column 1" },
    { id: "col2", header: "Column 2" },
    { id: "col3", header: "Column 3" },
  ];

  const columnVisibility = {
    col1: true,
    col2: false,
    col3: true,
  };

  test("renders the columns correctly", () => {
    render(
      <UpdateColumns
        columns={columns}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
        onColumnReorder={mockOnColumnReorder}
        onColumnPin={mockOnColumnPin}
      />
    );

    // Verify column headers are rendered
    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });
  });

  test("toggling column visibility", () => {
    render(
      <UpdateColumns
        columns={columns}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
        onColumnReorder={mockOnColumnReorder}
        onColumnPin={mockOnColumnPin}
      />
    );

    // Find the visibility icon for Column 2 (initially hidden)
    const visibilityIcon = screen.getByText("Column 2").nextSibling;
    fireEvent.click(visibilityIcon); // Toggle visibility

    // Verify visibility change
    expect(mockOnColumnVisibilityChange).toHaveBeenCalledWith("col2", true);
  });

  test("dragging a column to reorder", () => {
    render(
      <UpdateColumns
        columns={columns}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
        onColumnReorder={mockOnColumnReorder}
        onColumnPin={mockOnColumnPin}
      />
    );

    const column1 = screen.getByText("Column 1");
    const column3 = screen.getByText("Column 3");

    // Simulate dragging column1 and dropping it over column3
    fireEvent.dragStart(column1);
    fireEvent.dragEnter(column3);
    fireEvent.drop(column3);

    // Verify the reorder function was called (you'll need to adjust based on how `onColumnReorder` is implemented)
    expect(mockOnColumnReorder).toHaveBeenCalledWith(column1.id, column3.id);
  });

  test("pins and unpins columns", () => {
    render(
      <UpdateColumns
        columns={columns}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
        onColumnReorder={mockOnColumnReorder}
        onColumnPin={mockOnColumnPin}
      />
    );

    const column1PinButton = screen.getByText("Column 1").nextSibling;

    // Simulate pinning and unpinning the column
    fireEvent.click(column1PinButton); // Pin column
    expect(mockOnColumnPin).toHaveBeenCalledWith("col1", true);

    fireEvent.click(column1PinButton); // Unpin column
    expect(mockOnColumnPin).toHaveBeenCalledWith("col1", false);
  });
});
