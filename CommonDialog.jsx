import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommonDialog from './CommonDialog';
import '@testing-library/jest-dom/extend-expect';

describe('CommonDialog Component', () => {
  const mockHandleClose = jest.fn();
  const mockHandleConfirm = jest.fn();
  const defaultProps = {
    open: true,
    title: 'Dialog Title',
    content: 'Dialog Content',
    handleClose: mockHandleClose,
    handleConfirm: mockHandleConfirm,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  };

  beforeEach(() => {
    render(<CommonDialog {...defaultProps} />);
  });

  it('renders dialog title', () => {
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
  });

  it('renders dialog content', () => {
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('renders confirm button with correct text', () => {
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('renders cancel button with correct text', () => {
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls handleClose when cancel button is clicked', () => {
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it('calls handleConfirm when confirm button is clicked', () => {
    fireEvent.click(screen.getByText('Confirm'));
    expect(mockHandleConfirm).toHaveBeenCalledTimes(1);
  });
});




import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

const CommonDialog = ({
  open,
  title,
  content,
  handleClose,
  handleConfirm,
  confirmText ,
  cancelText ,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          {cancelText}
        </Button>
        <Button onClick={handleConfirm} color="primary">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialog;
 write test case for this
