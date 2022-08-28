import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';

function AppWrapper() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}

export default AppWrapper;
