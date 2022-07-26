import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
// import {Buffer} from 'buffer';
import {PermissionsAndroid, Platform} from 'react-native';
import {removeFirstDPAndAddNewDP} from '../../utils/hooks/generateData';

export interface BLEDevice {
  services: string[];
  characteristics: any[];
  peripheralID: string;
}

export interface AppBluetoothState {
  currentBLEDataPoint: number;
  devices: BLEDevice[];
  devicesFound: any[];
  connectedDevices: any[];
  connected: boolean;
  // peripheralDevices: Map<string, any>;
  isScanning: boolean;
  permissionResult: boolean;
  sensorData: number[];
}

const initialState: AppBluetoothState = {
  currentBLEDataPoint: 0,
  // peripheralDevices: new Map(),
  devices: [
    // {
    //   serviceUUID: '4FAFC201-1FB5-459E-8FCC-C5C9C331914B',
    //   characteristicUUID: 'BEB5483E-36E1-4688-B7F5-EA07361B26A8',
    //   peripheralID: '9BDB63E8-33FA-962F-OBDA-1D9781E2B3B6', // Need a better method to find device ID....
    // },
  ],
  devicesFound: [],
  connectedDevices: [],
  connected: false,
  isScanning: false,
  permissionResult: false,
  sensorData: [],
};

// Most of this is rendered useless as you SHOULD NOT STORE non-serializable data
// inside of the redux store.
export const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    addBLEDevice: (state, {payload}: {payload: any}) => {
      console.log('PAYLOAD: ', payload);
      let newDevice = {
        peripheralID: payload?.id,
        services: payload?.services,
        characteristics: payload?.characteristics,
      };
      state.devices = [...state.devices, newDevice];
    },
    startManager: (state, action) => {
      console.log('ACTION: ', action);
      action.payload.bleManager.start({showAlert: true});
    },
    checkPermissions: state => {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(result => {
          if (result) {
            console.log('Permission is OK');
            state.permissionResult = true;
          } else {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then(permissionResult => {
              if (permissionResult) {
                console.log('User accepted');
                state.permissionResult = true;
              } else {
                console.log('User refused');
                state.permissionResult = false;
              }
            });
          }
        });
      }
    },
    setBLEDataPoint: (state, action: PayloadAction<number>) => {
      if (state.sensorData.length <= 40) {
        state.sensorData = [...state.sensorData, action.payload];
      } else {
        state.sensorData = removeFirstDPAndAddNewDP(
          action.payload,
          state.sensorData,
        );
      }
      state.currentBLEDataPoint = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    setDevicesFound: (state, action: PayloadAction<any>) => {
      state.devicesFound = action.payload;
    },
    setConnectedDevices: (state, action: PayloadAction<any>) => {
      state.connected = true;
      // TODO: When Flipper issue is resolved for physical devices, check store if multiple devices are correctly added
      // and not the case of just one device replacing a new device each time.
      state.connectedDevices = [...state.connectedDevices, action.payload];
    },
    setScanning: (state, action: PayloadAction<boolean>) => {
      state.isScanning = action.payload;
    },
    // retrieveConnected: (state, action) => {
    //   action.payload.bleManager
    //     .getConnectedPeripherals([])
    //     .then((results: any) => {
    //       if (results.length === 0) {
    //         console.log('No connected peripherals');
    //       }
    //       console.log('List of connected peripherals: ', results);
    //       for (var i = 0; i < results.length; i++) {
    //         var peripheral = results[i];
    //         peripheral.connected = true;
    //         state.peripheralDevices.set(peripheral.id, peripheral);
    //       }
    //     });
    // },
    // connectPeripheral: (state, action: PayloadAction<any>) => {
    //   const {peripheral} = action.payload;
    //   console.log('CONNTECTING TO PERIPHERAL - Connected: ', peripheral);
    //   console.log('CONNTECTING TO PERIPHERAL - ID: ', peripheral);
    //   state.bleManager
    //     .connect(peripheral.id)
    //     .then(() => {
    //       let p = state.peripheralDevices.get(peripheral.id);
    //       if (p) {
    //         p.connected = true;
    //         state.peripheralDevices.set(peripheral.id, p);
    //       }
    //       console.log('Connected to ' + peripheral.id);
    //       state.connectedDevices.push(peripheral.id);
    //     })
    //     .catch(e => {
    //       console.log('ERROR OCCURRED: ', e);
    //     });
    // },
    // // readBLEDeviceAndUpdateValue: state => {
    //   state.bleManager
    //     .read(
    //       state.deviceIds[0].peripheralID,
    //       state.deviceIds[0].serviceUUID,
    //       state.deviceIds[0].characteristicUUID,
    //     )
    //     .then((readData: any) => {
    //       const buffer = Buffer.from(readData);
    //       const sensorDataPoint = buffer.readUInt8(0, true);
    //       console.log('SENSOR DATA: ', sensorDataPoint);
    //       if (state.sensorData.length <= 50) {
    //         state.sensorData.push(sensorDataPoint);
    //       } else {
    //         let newData: number[] = state.sensorData.slice(1);
    //         newData.push(sensorDataPoint);
    //         state.sensorData = newData;
    //       }
    //     })
    //     .catch((error: any) => {
    //       console.log(error);
    //     });
    // },
  },
  // extraReducers: builder => {
  //   builder.addCase(scanForBleDevices.fulfilled, (state, {payload}) => {
  //     console.log('ACTIONPAYLOAD: ', payload);

  //     //   state.peripheralDevices = payload;
  //   });
  //   builder.addCase(scanForBleDevices.pending, state => {
  //     state.scanning = true;
  //   });
  //   builder.addCase(scanForBleDevices.rejected, state => {
  //     state.scanning = false;
  //   });
  // },
});

export const {
  startManager,
  setConnected,
  setScanning,
  setDevicesFound,
  setConnectedDevices,
  // retrieveConnected,
  addBLEDevice,
  setBLEDataPoint,
  // connectPeripheral,
  //   readBLEDeviceAndUpdateValue,
} = bluetoothSlice.actions;

export default bluetoothSlice.reducer;
