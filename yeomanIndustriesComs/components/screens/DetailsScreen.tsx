import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Button} from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Details: {
    itemId: number;
    itemName: string;
  };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailsScreen({navigation, route}: Props) {
  const {itemId, itemName} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>{itemName + ' ' + itemId}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Return" onPress={() => navigation.popToTop()} />
    </View>
  );
}

export default DetailsScreen;
