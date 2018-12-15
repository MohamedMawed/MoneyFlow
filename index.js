/** @format */
import React, { Component } from 'react'
import { AppRegistry, View, StatusBar } from 'react-native';
import App from './App';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import {persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { name as appName } from './app.json';
import {AppReducer} from './App/state/reducer';
import { Login } from './App/Screen/Login';
import { Register } from './App/Screen/Register';
import { Intro } from './App/Screen/Intro';
import { NavigationsScreen } from './App/Global/NavigationsScreen';
import Navigator from './App/Screen/TabNavigator'
import { Colors } from './App/Global';
import configureStore from './App/state/store';
import { combineReducers } from 'redux';

let userPersistConfig = {
    key: 'user',
    storage: storage,
    whitelist: ['appReducer']
  };
  const authPersistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['somethingTemporary']
  }
let appReducer = new AppReducer();
const mainReducer = combineReducers({
    appReducer: persistReducer(authPersistConfig, appReducer.reduce),
  });
appReducer=persistReducer(userPersistConfig, mainReducer); 

const {store,persistor} = configureStore(appReducer)

store.subscribe(()=>{
  console.log("TAG","storeState",store.getState())
})
class MainApp extends Component {
    render() {
        return (
            <View style={{
                width: '100%',
                height: '100%'
            }}>
                <StatusBar
                    backgroundColor={Colors.greenlite}
                />
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Navigator />

                    </PersistGate>

                </Provider>
            </View>
        )
    }
}

AppRegistry.registerComponent(appName, () => MainApp);
