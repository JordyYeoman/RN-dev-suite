import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Details: {
    itemId: number;
    itemName: string;
  };
  BLEScanner: undefined;
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  'Home' | 'Details' | 'BLEScanner'
>;

export enum ScreenType {
  HOME = 'home',
  SECONDARY = 'secondary',
}
