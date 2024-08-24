import { render, screen, fireEvent } from '@testing-library/react';
import { fetchData, handleAccordionClick, setIsLoading, setIsError, setData, setCsFactor, setItFactor, setIsRefetching, setLastSelectedSku } from './your-component'; // Replace with your actual component/module

jest.mock('./your-component', () => ({
  // Mock all the functions to track calls and return values
  fetchData: jest.fn(),
  handleAccordionClick: jest.fn(),
  setIsLoading: jest.fn(),
  setIsError: jest.fn(),
  setData: jest.fn(),
  setCsFactor: jest.fn(),
  setItFactor: jest.fn(),
  setIsRefetching: jest.fn(),
  setLastSelectedSku: jest.fn(),
}));

// Mock the API call 
jest.mock('your-api-module', () => ({
  cpfSkuForecast: jest.fn().mockResolvedValue({
    forecast: 'mockForecastData',
    cs_factor: 'mockCsFactorData',
    it_factor: 'mockItFactorData',
  }), 
})); 

describe('fetchData', () => {
  it('should make API call and update state', async () => {
    const mockSku = 'testSku';

    await fetchData(mockSku);

    // Expect API call to be made
    expect(cpfSkuForecast).toHaveBeenCalledWith({
      sku: mockSku,
      customerId: selectedFilters.customerId[0],
      eventType: selectedFilters.eventType,
      eventSubtype: selectedFilters.eventSubtype,
    }); 

    // Expect state updates
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setData).toHaveBeenCalledWith('mockForecastData');
    expect(setCsFactor).toHaveBeenCalledWith('mockCsFactorData');
    expect(setItFactor).toHaveBeenCalledWith('mockItFactorData');
    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(setIsRefetching).toHaveBeenCalledWith(false);
  });

  it('should handle errors correctly', async () => {
    // Mock API to throw an error
    cpfSkuForecast.mockRejectedValue(new Error('Mock Error'));

    const mockSku = 'testSku';

    await fetchData(mockSku);

    // Expect state updates for error handling
    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setIsError).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });
});

describe('handleAccordionClick', () => {
  it('should call fetchData if sku is different from lastSelectedSku', () => {
    const mockSku = 'testSku';
    const mockLastSelectedSku = 'differentSku';

    handleAccordionClick(mockSku);

    expect(fetchData).toHaveBeenCalledWith(mockSku);
    expect(setLastSelectedSku).toHaveBeenCalledWith(mockSku);
  });

  it('should not call fetchData if sku is same as lastSelectedSku', () => {
    const mockSku = 'testSku';

    setLastSelectedSku(mockSku); // Set the last selected sku

    handleAccordionClick(mockSku);

    expect(fetchData).not.toHaveBeenCalled();
  });
});