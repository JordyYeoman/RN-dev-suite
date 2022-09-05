import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';
import {store} from './store/store';
import {Provider} from 'react-redux';

function AppWrapper() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
}

export default AppWrapper;
