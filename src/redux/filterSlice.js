import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: '' };

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, { payload }) {
      return (state = payload);
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

export const getFilterValue = state => state.filter.value;
