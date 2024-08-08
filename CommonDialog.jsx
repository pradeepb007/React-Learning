import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommonDialog from './CommonDialog';
import '@testing-library/jest-dom/extend-expect';

test('renders CommonDialog and checks interactions', () => {
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

  render(<CommonDialog {...defaultProps} />);

  // Check if title is rendered
  expect(screen.getByText('Dialog Title')).toBeInTheDocument();

  // Check if content is rendered
  expect(screen.getByText('Dialog Content')).toBeInTheDocument();

  // Check if confirm button is rendered
  const confirmButton = screen.getByText('Confirm');
  expect(confirmButton).toBeInTheDocument();

  // Check if cancel button is rendered
  const cancelButton = screen.getByText('Cancel');
  expect(cancelButton).toBeInTheDocument();

  // Simulate click on cancel button and check if handleClose is called
  fireEvent.click(cancelButton);
  expect(mockHandleClose).toHaveBeenCalledTimes(1);

  // Simulate click on confirm button and check if handleConfirm is called
  fireEvent.click(confirmButton);
  expect(mockHandleConfirm).toHaveBeenCalledTimes(1);
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
