import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './Screens/DetailsScreen';
import HomeScreen from './Screens/HomeScreen';
import BLEScannerScreen from './Screens/BLEScannerScreen';
import {AnalyticsScreen} from './Screens/AnalyticsScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BLEScanner"
        component={BLEScannerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default App;
