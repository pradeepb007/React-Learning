import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableData from './TableData';

describe('TableData', () => {
  const data = [
    { week: '12/06/2024', unit: '100', prevUnit: '90', editedUnit: null, finalUnit: '104', approved: true, active: true, originalUnit: 'cm' },
    { week: '13/06/2024', unit: '100', prevUnit: '70', editedUnit: '105', finalUnit: '105', approved: false, active: true, originalUnit: 'cm' },
  ];
  const mmdata = 10;
  const cdata = 100;
  const selectedUnit = 'cm';
  const editedValues = {};
  const setIsLoading = jest.fn();
  const isLoading = false;
  const setEditedValues = jest.fn();
  const onSubmit = jest.fn();

  it('renders correctly', () => {
    render(
      <TableData
        data={data}
        mmdata={mmdata}
        cdata={cdata}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
      />
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('opens dialog on save click', () => {
    render(
      <TableData
        data={data}
        mmdata={mmdata}
        cdata={cdata}
        selectedUnit={selectedUnit}
        editedValues={editedValues}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
      />
    );
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText('save decision')).toBeInTheDocument();
  });

  it('handles empty editedValues', () => {
    render(
      <TableData
        data={data}
        mmdata={mmdata}
        cdata={cdata}
        selectedUnit={selectedUnit}
        editedValues={null}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
      />
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableData from './TableData';

// Mocking the `ConfirmationDialog` component
jest.mock('./ConfirmationDialog', () => ({
  __esModule: true,
  default: ({ open, onClose, onConfirm, title }) => (
    open ? (
      <div>
        <h1>{title}</h1>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null
  ),
}));

describe('TableData', () => {
  const data = [
    { week: '12/06/2024', unit: '100', prevUnit: '90', editedUnit: null, finalUnit: '104', approved: true, active: true, originalUnit: 'cm' },
    { week: '13/06/2024', unit: '100', prevUnit: '70', editedUnit: '105', finalUnit: '105', approved: false, active: true, originalUnit: 'cm' },
  ];
  const mmdata = 10;
  const cdata = 100;
  const selectedUnit = 'cm';
  const setIsLoading = jest.fn();
  const isLoading = false;
  const setEditedValues = jest.fn();
  const onSubmit = jest.fn();

  it('renders correctly', () => {
    render(
      <TableData
        data={data}
        mmdata={mmdata}
        cdata={cdata}
        selectedUnit={selectedUnit}
        editedValues={{}}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
      />
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('opens dialog on save click', () => {
    render(
      <TableData
        data={data}
        mmdata={mmdata}
        cdata={cdata}
        selectedUnit={selectedUnit}
        editedValues={{}}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
      />
    );
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText('save decision')).toBeInTheDocument();
  });

  it('handles empty editedValues', () => {
    render(
      <TableData
        data={data}
        mmdata={mmdata}
        cdata={cdata}
        selectedUnit={selectedUnit}
        editedValues={null}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
      />
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('calls handleCellEdit correctly', () => {
    const setEditedValuesMock = jest.fn();
    render(
      <TableData
        data={data}
        mmdata={mmdata}
        cdata={cdata}
        selectedUnit={selectedUnit}
        editedValues={{}}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValuesMock}
        onSubmit={onSubmit}
      />
    );

    const table = screen.getByRole('table');
    // Assuming cells have a data-testid for easier selection
    const cell = table.querySelector('[data-testid="cell-0-1"]');
    fireEvent.change(cell, { target: { value: '110' } });

    expect(setEditedValuesMock).toHaveBeenCalledWith(expect.objectContaining({
      0: { 'column-id': '110' },  // Adjust based on actual column ID
    }));
  });

  it('converts length correctly', () => {
    const { convertLength } = render(
      <TableData
        data={data}
        mmdata={mmdata}
        cdata={cdata}
        selectedUnit={selectedUnit}
        editedValues={{}}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
      />
    ).instance;

    expect(convertLength(10, 'mm')).toBe(100); // 10 * mmdata
    expect(convertLength(100, 'm')).toBe('1.00'); // 100 / cdata
    expect(convertLength(10, 'cm')).toBe(10); // No conversion
  });

  it('handles submission and snackbar display', async () => {
    const updatedData = jest.fn().mockResolvedValue({});
    const { getByText } = render(
      <TableData
        data={data}
        mmdata={mmdata}
        cdata={cdata}
        selectedUnit={selectedUnit}
        editedValues={{}}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setEditedValues={setEditedValues}
        onSubmit={onSubmit}
      />
    );

    fireEvent.click(getByText('Save'));
    fireEvent.click(getByText('Confirm'));

    await waitFor(() => {
      expect(updatedData).toHaveBeenCalledWith(expect.objectContaining({
        units: selectedUnit,
        data: expect.any(Array),
      }));
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});

