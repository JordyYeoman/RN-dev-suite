import {BleManager} from '../../utils/bleManager';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const scanForBleDevices = createAsyncThunk(
  'users/fetchByIdStatus',
  async (bleManager: BleManager) => {
    bleManager
      .scan([], 3, true, null)
      .then(_results => {
        console.log('Devices Found: ', _results);
        return _results;
      })
      .catch(err => {
        console.error(err);
      });
  },
);
