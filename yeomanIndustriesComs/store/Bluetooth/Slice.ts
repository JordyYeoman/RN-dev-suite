import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Buffer} from 'buffer';
import {PermissionsAndroid, Platform} from 'react-native';
import {scanForBleDevices} from './Actions';

export interface BLEDevice {
  serviceUUID: string;
  characteristicUUID: string;
  peripheralID: string;
}

export interface AppBluetoothState {
  deviceIds: BLEDevice[];
  connected: boolean;
  peripheralDevices: Map<string, any>;
  scanning: boolean;
  connectedDevices: any[];
  permissionResult: boolean;
  sensorData: number[];
}

const initialState: AppBluetoothState = {
  peripheralDevices: new Map(),
  deviceIds: [
    {
      serviceUUID: '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
      characteristicUUID: 'beb5483e-36e1-4688-b7f5-ea07361b26a8',
      peripheralID: 'B604D8B3-EB4D-C6B3-E257-9F2EC29F9C16',
    },
  ],
  connectedDevices: [],
  connected: false,
  scanning: false,
  permissionResult: false,
  sensorData: [],
};

// Most of this is rendered useless as you SHOULD NOT STORE non-serializable data
// inside of the redux store.
export const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
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
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    retrieveConnected: (state, action) => {
      action.payload.bleManager
        .getConnectedPeripherals([])
        .then((results: any) => {
          if (results.length === 0) {
            console.log('No connected peripherals');
          }
          console.log('List of connected peripherals: ', results);
          for (var i = 0; i < results.length; i++) {
            var peripheral = results[i];
            peripheral.connected = true;
            state.peripheralDevices.set(peripheral.id, peripheral);
          }
        });
    },
    connectPeripheral: (state, action: PayloadAction<any>) => {
      const {peripheral} = action.payload;
      console.log('CONNTECTING TO PERIPHERAL - Connected: ', peripheral);
      console.log('CONNTECTING TO PERIPHERAL - ID: ', peripheral);
      state.bleManager
        .connect(peripheral.id)
        .then(() => {
          let p = state.peripheralDevices.get(peripheral.id);
          if (p) {
            p.connected = true;
            state.peripheralDevices.set(peripheral.id, p);
          }
          console.log('Connected to ' + peripheral.id);
          state.connectedDevices.push(peripheral.id);
        })
        .catch(e => {
          console.log('ERROR OCCURRED: ', e);
        });
    },
    // readBLEDeviceAndUpdateValue: state => {
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
  extraReducers: builder => {
    builder.addCase(scanForBleDevices.fulfilled, (state, {payload}) => {
      console.log('ACTIONPAYLOAD: ', payload);
      //   state.peripheralDevices = payload;
    });
    builder.addCase(scanForBleDevices.pending, state => {
      state.scanning = true;
    });
    builder.addCase(scanForBleDevices.rejected, state => {
      state.scanning = false;
    });
  },
});

export const {
  startManager,
  setConnected,
  retrieveConnected,
  connectPeripheral,
  //   readBLEDeviceAndUpdateValue,
} = bluetoothSlice.actions;

export default bluetoothSlice.reducer;

// Moving here until it is known to be unnecessary
// const testPeripheral = (peripheral: {connected: any; id: string}) => {
//   if (peripheral) {
//     if (peripheral.connected) {
//       BleManager.disconnect(peripheral.id);
//     } else {
//       BleManager.connect(peripheral.id)
//         .then(() => {
//           let p = peripherals.get(peripheral.id);
//           if (p) {
//             p.connected = true;
//             peripherals.set(peripheral.id, p);
//             setList(Array.from(peripherals.values()));
//           }
//           console.log('Connected to ' + peripheral.id);

//           setTimeout(() => {
//             /* Test read current RSSI value */
//             BleManager.retrieveServices(peripheral.id).then(
//               peripheralData => {
//                 console.log('Retrieved peripheral services', peripheralData);

//                 BleManager.readRSSI(peripheral.id).then(rssi => {
//                   console.log('Retrieved actual RSSI value', rssi);
//                   let k = peripherals.get(peripheral.id);
//                   if (k) {
//                     k.rssi = rssi;
//                     peripherals.set(peripheral.id, k);
//                     setList(Array.from(peripherals.values()));
//                   }
//                 });
//               },
//             );
//           }, 900);
//         })
//         .catch(error => {
//           console.log('Connection error', error);
//         });
//     }
//   }
// };
