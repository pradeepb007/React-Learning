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
