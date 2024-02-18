import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { message: '' };

export const fetchRandomGreeting = createAsyncThunk(
  'greeting/fetchRandomGreeting',
  async () => {
    const response = await fetch('http://localhost:3001/random_greeting');
    const data = await response.json();
    return data.message;
  },
);

const greetingSlice = createSlice({
  name: 'greeting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomGreeting.pending, (state) => {
        state.message = 'Loading...';
      })
      .addCase(fetchRandomGreeting.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(fetchRandomGreeting.rejected, (state) => {
        state.message = 'Error fetching greeting';
      });
  },
});

export default greetingSlice.reducer;
