import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomColumnsMenu from './CustomColumnsMenu';

// Mock for cookies
const mockSetCookie = jest.fn();
const mockGetCookie = jest.fn();

Object.defineProperty(document, 'cookie', {
  get: mockGetCookie,
  set: mockSetCookie,
  configurable: true,
});

describe('CustomColumnsMenu', () => {
  const columns = [
    { id: 'firstName', header: 'First Name' },
    { id: 'lastName', header: 'Last Name' },
    { id: 'age', header: 'Age' },
  ];

  const initialVisibility = {
    firstName: true,
    lastName: false,
    age: true,
  };

  const mockOnColumnVisibilityChange = jest.fn();

  beforeEach(() => {
    mockSetCookie.mockClear();
    mockGetCookie.mockClear();
  });

  test('renders correctly with columns and default visibility', () => {
    mockGetCookie.mockReturnValueOnce(JSON.stringify(initialVisibility));

    render(
      <CustomColumnsMenu
        columns={columns}
        columnVisibility={initialVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
      />
    );

    expect(screen.getByText('Show Columns Menu')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeChecked();
    expect(screen.getByLabelText('Last Name')).not.toBeChecked();
    expect(screen.getByLabelText('Age')).toBeChecked();
  });

  test('toggles menu visibility on button click', () => {
    render(
      <CustomColumnsMenu
        columns={columns}
        columnVisibility={initialVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
      />
    );

    const button = screen.getByText('Show Columns Menu');
    fireEvent.click(button);

    expect(screen.getByText('Hide Columns Menu')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
  });

  test('updates column visibility and sets cookie on checkbox change', () => {
    render(
      <CustomColumnsMenu
        columns={columns}
        columnVisibility={initialVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Last Name'));

    expect(mockOnColumnVisibilityChange).toHaveBeenCalledWith('lastName', true);
    expect(mockSetCookie).toHaveBeenCalledWith('columnVisibility', JSON.stringify({
      firstName: true,
      lastName: true,
      age: true,
    }), 365);
  });

  test('loads column visibility from cookies', () => {
    mockGetCookie.mockReturnValueOnce(JSON.stringify(initialVisibility));

    render(
      <CustomColumnsMenu
        columns={columns}
        columnVisibility={initialVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
      />
    );

    expect(mockGetCookie).toHaveBeenCalledWith('columnVisibility');
  });

  test('does not render columns when menu is not open', () => {
    render(
      <CustomColumnsMenu
        columns={columns}
        columnVisibility={initialVisibility}
        onColumnVisibilityChange={mockOnColumnVisibilityChange}
      />
    );

    expect(screen.queryByLabelText('First Name')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Last Name')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Age')).not.toBeInTheDocument();
  });
});
