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
import { render, fireEvent, waitFor } from '@testing-library/react';
import { TableData } from './TableData';

describe('TableData component', () => {
  const data = [
    {
      week: '12/06/2024',
      unit: '100',
      prevUnit: '90',
      editedUnit: null,
      finalUnit: '104',
      approved: true,
      active: true,
      originalUnit: 'cm',
    },
    // ...
  ];
  const mmdata = 10;
  const cdata = 100;
  const selectedUnit = 'cm';
  const editedValues = {};
  const setIsLoading = jest.fn();
  const isLoading = false;
  const setEditedValues = jest.fn();
  const onSubmit = jest.fn();

  it('renders table with data', () => {
    const { getByText } = render(
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
    expect(getByText('12/06/2024')).toBeInTheDocument();
  });

  it('calls handleSave when save button is clicked', () => {
    const { getByText } = render(
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
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);
    expect(setIsLoading).toHaveBeenCalledTimes(1);
  });

  it('calls handleSubmit when confirm button is clicked', async () => {
    const { getByText } = render(
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
    const saveButton = getByText('Save');
    fireEvent.click(saveButton);
    const confirmButton = await waitFor(() => getByText('Confirm'));
    fireEvent.click(confirmButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
