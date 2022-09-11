import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {BluetoothProvider} from './context/BluetoothContext';

function AppWrapper() {
  return (
    <Provider store={store}>
      <BluetoothProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </BluetoothProvider>
    </Provider>
  );
}

export default AppWrapper;
