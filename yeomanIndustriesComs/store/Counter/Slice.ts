import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  listOfNumbers: number[];
  average: number;
}

const initialState: CounterState = {
  value: 0,
  listOfNumbers: [1, 2, 3, 4, 5, 6],
  average: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    updateAverageOfValues: state => {
      let sum: number = 0;
      for (let j = 0; j < state.listOfNumbers.length; j++) {
        sum += state.listOfNumbers[j] ?? 0;
      }
      state.average = sum;
    },
  },
});

// Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount, updateAverageOfValues} =
  counterSlice.actions;

export default counterSlice.reducer;
