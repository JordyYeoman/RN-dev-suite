import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Provider} from 'react-redux';
import {store as reduxStore, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';

function AppWrapper() {
  return (
    <Provider store={reduxStore}>
      {/* // Can pass loading screen here */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

export default AppWrapper;
