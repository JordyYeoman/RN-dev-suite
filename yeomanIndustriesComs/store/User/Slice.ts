import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface BLEDevice {
  serviceUUID: string;
  characteristicUUID: string;
  peripheralID: string;
}

export interface UserState {
  firstName: string;
  lastName: string;
  deviceIds: BLEDevice[];
  connected: boolean;
}

const initialState: UserState = {
  firstName: 'Jordy',
  lastName: 'Yeoman',
  deviceIds: [
    {
      serviceUUID: '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
      characteristicUUID: 'beb5483e-36e1-4688-b7f5-ea07361b26a8',
      peripheralID: 'B604D8B3-EB4D-C6B3-E257-9F2EC29F9C16',
    },
  ],
  connected: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
