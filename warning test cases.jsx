import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice'; // Adjust the import based on your file structure
import AddEventForm from './AddEventForm'; // Adjust the import based on your file structure
import '@testing-library/jest-dom/extend-expect';
import moment from 'moment';

const mockStore = configureStore({
  reducer: {
    settingsData: settingsReducer,
  },
});

const mockData = {
  event_in_store_start_date: moment().add(1, 'days').format('MM/DD/YYYY'),
  event_in_store_end_date: moment().add(2, 'days').format('MM/DD/YYYY'),
  item_type: 'Type1',
};

describe('AddEventForm', () => {
  test('should handle form warnings correctly', async () => {
    const warningResponse = {
      response: {
        data: {
          warnings: [
            {
              field: 'Event in store end date',
              warning: 'The event end date is close to the start date',
            },
          ],
        },
      },
    };

    addNewRowData.mockRejectedValueOnce(warningResponse);
    const handleClose = jest.fn();
    render(
      <Provider store={mockStore}>
        <AddEventForm handleClose={handleClose} />
      </Provider>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Event in store start date/i), {
        target: { value: mockData.event_in_store_start_date },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Event in store end date/i), {
        target: { value: mockData.event_in_store_end_date },
      });
    });

    await act(async () => {
      const itemType = screen.getByLabelText(/Item type/i);
      fireEvent.mouseDown(itemType);
      fireEvent.click(screen.getByText(/Type1/i));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Next Step'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Save New Event'));
    });

    await waitFor(() => {
      expect(screen.getByText(/Warning/i)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Submit'));
    });

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledWith(null, 'add');
    });
  });
});
