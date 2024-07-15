import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  settings: {
    id: true,
    customerId: true,
    desc: true,
    startDate: true,
    endDate: true,
    startDate2: true,
    endDate2: true,
    customerType: true,
    customerSubType: true,
    demand: true,
    comment: true,
  },
  status: 'idle',
  error: null,
};

// Async thunk for fetching settings
export const getSettings = createAsyncThunk('settings/getSettings', async () => {
  const response = await axios.get('/api/settings'); // Adjust API endpoint as needed
  return response.data;
});

// Async thunk for updating settings
export const updateSettings = createAsyncThunk('settings/updateSettings', async (newSettings) => {
  const response = await axios.post('/api/settings', newSettings); // Adjust API endpoint as needed
  return response.data;
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.settings = action.payload;
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.settings = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default settingsSlice.reducer;
