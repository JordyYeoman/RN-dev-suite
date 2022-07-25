import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import App from './App';

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWrapper;
