import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableMain from './TableMain';

describe('TableMain', () => {
  it('renders correctly', () => {
    render(<TableMain />);
    expect(screen.getByText('TableMain')).toBeInTheDocument();
  });

  it('changes unit on button click', () => {
    render(<TableMain />);
    fireEvent.click(screen.getByText('mm'));
    expect(screen.getByText('mm')).toHaveClass('MuiButton-contained');
  });

  it('opens dialog when changing unit with unsaved changes', () => {
    render(<TableMain />);
    fireEvent.click(screen.getByText('Save'));
    fireEvent.click(screen.getByText('m'));
    expect(screen.getByText('Confirm Unit Change')).toBeInTheDocument();
  });

  it('confirms unit change and clears edited values', () => {
    render(<TableMain />);
    fireEvent.click(screen.getByText('Save'));
    fireEvent.click(screen.getByText('m'));
    fireEvent.click(screen.getByText('Confirm'));
    expect(screen.queryByText('Confirm Unit Change')).not.toBeInTheDocument();
  });

  it('cancels unit change', () => {
    render(<TableMain />);
    fireEvent.click(screen.getByText('Save'));
    fireEvent.click(screen.getByText('m'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Confirm Unit Change')).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TableMain } from './TableMain';

describe('TableMain component', () => {
  const tabledetails = [
    {
      data: [
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
      ],
      mmcovert: 10,
      mcovert: 100,
    },
    // ...
  ];

  it('renders table with data', () => {
    const { getByText } = render(<TableMain tabledetails={tabledetails} />);
    expect(getByText('12/06/2024')).toBeInTheDocument();
  });

  it('calls handleUnitChange when unit button is clicked', () => {
    const { getByText } = render(<TableMain tabledetails={tabledetails} />);
    const unitButton = getByText('mm');
    fireEvent.click(unitButton);
    expect(setSelectedUnit).toHaveBeenCalledTimes(1);
  });

  it('renders confirmation dialog when unit change is pending', () => {
    const { getByText } = render(<TableMain tabledetails={tabledetails} />);
    const unitButton = getByText('mm');
    fireEvent.click(unitButton);
    const dialog = getByText('Confirm Unit Change');
    expect(dialog).toBeInTheDocument();
  });

  it('calls handleConfirmUnitChange when confirm button is clicked', () => {
    const { getByText } = render(<TableMain tabledetails={tabledetails} />);
    const unitButton = getByText('mm');
    fireEvent.click(unitButton);
    const confirmButton = getByText('Confirm');
    fireEvent.click(confirmButton);
    expect(setSelectedUnit).toHaveBeenCalledTimes(1);
  });
});











import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableMain from './TableMain'; // Adjust the import path as necessary

describe('TableMain Component', () => {
  it('renders without crashing', () => {
    render(<TableMain />);
    expect(screen.getByText(/Select Units:/)).toBeInTheDocument();
  });

  it('opens the unit selection menu when the button is clicked', () => {
    render(<TableMain />);
    fireEvent.click(screen.getByLabelText(/more/));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('changes the selected unit when a unit button is clicked', () => {
    render(<TableMain />);
    fireEvent.click(screen.getByLabelText(/more/));
    fireEvent.click(screen.getByText('mm'));
    expect(screen.getByText('mm')).toHaveClass('MuiButton-contained');
  });

  it('opens the confirmation dialog when there are unsaved changes and unit is changed', () => {
    render(<TableMain />);
    // Simulate editing values
    fireEvent.click(screen.getByLabelText(/more/));
    fireEvent.click(screen.getByText('mm'));
    fireEvent.click(screen.getByText('Confirm'));
    expect(screen.getByText('Confirm Unit Change')).toBeInTheDocument();
  });

  it('closes the confirmation dialog when cancel is clicked', () => {
    render(<TableMain />);
    // Simulate editing values
    fireEvent.click(screen.getByLabelText(/more/));
    fireEvent.click(screen.getByText('mm'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Confirm Unit Change')).not.toBeInTheDocument();
  });

  it('resets edited values and changes the unit when confirm is clicked', () => {
    render(<TableMain />);
    // Simulate editing values
    fireEvent.click(screen.getByLabelText(/more/));
    fireEvent.click(screen.getByText('mm'));
    fireEvent.click(screen.getByText('Confirm'));
    expect(screen.queryByText('Confirm Unit Change')).not.toBeInTheDocument();
    // Assert the unit change
    expect(screen.getByText('mm')).toHaveClass('MuiButton-contained');
  });
});
