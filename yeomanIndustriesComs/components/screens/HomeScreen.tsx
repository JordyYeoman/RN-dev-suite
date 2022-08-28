import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Button} from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Details: {
    itemId: number;
    itemName: string;
  };
  BLEScanner: undefined;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Home' | 'Details' | 'BLEScanner'
>;

function HomeScreen({navigation}: Props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 482,
            itemName: 'Armour piece',
          })
        }
      />
      <Button
        title="Go to BLE Scanner"
        onPress={() => navigation.navigate('BLEScanner')}
      />
    </View>
  );
}

export default HomeScreen;
