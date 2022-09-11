import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NativeEventEmitter} from 'react-native';
import {BleManager} from '../utils/bleManager';

export type RootStackParamList = {
  Home: undefined;
  Details: {
    itemId: number;
    itemName: string;
  };
  BLEScanner: undefined;
  Analytics: undefined;
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  'Home' | 'Details' | 'BLEScanner' | 'Analytics'
>;

export enum ScreenType {
  HOME = 'home',
  SECONDARY = 'secondary',
}

export type BluetoothContextType = {
  bleManager: BleManager;
  bleManagerEventEmitter: NativeEventEmitter;
};
