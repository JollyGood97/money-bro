/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
// import database from '@react-native-firebase/database';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/app/store';

// database().setPersistenceEnabled(true);

const MoneyBro = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => MoneyBro);
