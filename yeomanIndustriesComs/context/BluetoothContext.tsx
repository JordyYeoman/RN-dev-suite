import {BluetoothContextType} from '../Types/Globaltypes';
import * as React from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {BleManager} from '../utils/bleManager';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBLEDataPoint,
  setDevicesFound,
  setScanning,
} from '../store/Bluetooth/Slice';
import {RootState} from '../store/store';
import {Buffer} from 'buffer';
import useInterval from '../utils/hooks/useInterval';

export const BluetoothContext =
  React.createContext<BluetoothContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const BluetoothProvider: React.FC<Props> = ({children}): JSX.Element => {
  const bleManager: BleManager = new BleManager();
  const bleManagerEventEmitter = new NativeEventEmitter(
    NativeModules.BleManager,
  );
  const peripherals = new Map();
  const dispatch = useDispatch();
  const {devices, connectedDevices} = useSelector(
    (state: RootState) => state.bluetooth,
  );

  // BLUETOOTH EVENT LISTENERS
  const handleDiscoverPeripheral = (peripheral: {name: string; id: any}) => {
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    dispatch(setDevicesFound(Array.from(peripherals.values())));
  };

  const handleStopScan = () => {
    console.log('Scan is stopped');
    dispatch(setScanning(false));
  };

  React.useEffect(() => {
    console.log('Systems Booting...');
    bleManager.start({showAlert: true});
    bleManagerEventEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEventEmitter.addListener('BleManagerStopScan', handleStopScan);
    console.log('Systems Online & Ready Sir.');
    return () => {
      console.log('unmount');
      bleManagerEventEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEventEmitter.removeAllListeners('BleManagerStopScan');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Ignore error - This is fine as we need to only mount the listeners once

  const readBLEDeviceValue = () => {
    if (devices.length > 0) {
      bleManager
        .read(
          devices[0].peripheralID,
          devices[0].services[0],
          devices[0].characteristics[0].characteristic,
        )
        .then((readData: any) => {
          const buffer = Buffer.from(readData);
          const sensorDataPoint = buffer.readUInt8(0, true);
          dispatch(setBLEDataPoint(sensorDataPoint));
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // Poll the notification status:
  useInterval(() => {
    if (devices?.length > 0 && connectedDevices?.length > 0) {
      readBLEDeviceValue();
    }
  }, 50); // 50ms should mean 20 updates per second

  return (
    <>
      <BluetoothContext.Provider value={{bleManager, bleManagerEventEmitter}}>
        {children}
      </BluetoothContext.Provider>
    </>
  );
};
