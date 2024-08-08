import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PromoGridValidations from './PromoGridValidations'; // Adjust the import based on your file structure
import { promoGridValidate } from './api'; // Adjust the import based on your file structure
import { store } from './store'; // Adjust the import based on your file structure

jest.mock('./api');

describe('handleValidate function', () => {
    test('calls promoGridValidate and handles warnings', async () => {
        const mockUpdatedState = {
            rows: [
                {
                    golden_customer_id: '1',
                    validation_warnings: { custID: 'Warning message' }
                }
            ]
        };

        promoGridValidate.mockResolvedValue(mockUpdatedState);

        await act(async () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <PromoGridValidations />
                    </BrowserRouter>
                </Provider>
            );
        });

        const validateButton = screen.getByText('Validate');
        expect(validateButton).toBeInTheDocument();

        fireEvent.click(validateButton);

        await waitFor(() => {
            expect(promoGridValidate).toHaveBeenCalledTimes(1);
        });

        // Check if the warning dialog is shown
        await waitFor(() => {
            expect(screen.getByText('Validation Warnings')).toBeInTheDocument();
        });

        // Simulate closing the warning dialog
        const yesButton = screen.getByText('Yes');
        fireEvent.click(yesButton);

        await waitFor(() => {
            expect(screen.getByText('Validation successful. You can proceed to submit.')).toBeInTheDocument();
        });
    });

    test('calls promoGridValidate and handles success without warnings or errors', async () => {
        const mockUpdatedState = {
            rows: []
        };

        promoGridValidate.mockResolvedValue(mockUpdatedState);

        await act(async () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <PromoGridValidations />
                    </BrowserRouter>
                </Provider>
            );
        });

        const validateButton = screen.getByText('Validate');
        expect(validateButton).toBeInTheDocument();

        fireEvent.click(validateButton);

        await waitFor(() => {
            expect(promoGridValidate).toHaveBeenCalledTimes(1);
        });

        // Check if the success snackbar is shown
        await waitFor(() => {
            expect(screen.getByText('Validation successful. You can proceed to submit.')).toBeInTheDocument();
        });
    });

    test('calls promoGridValidate and handles errors', async () => {
        const mockResponseData = {
            rows: [
                {
                    golden_customer_id: '1',
                    validation_errors: { custID: 'Error message' }
                }
            ]
        };

        promoGridValidate.mockRejectedValue({ response: { data: mockResponseData } });

        await act(async () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <PromoGridValidations />
                    </BrowserRouter>
                </Provider>
            );
        });

        const validateButton = screen.getByText('Validate');
        expect(validateButton).toBeInTheDocument();

        fireEvent.click(validateButton);

        await waitFor(() => {
            expect(promoGridValidate).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Validation failed. Please fix the errors.')).toBeInTheDocument();
        });
    });
});