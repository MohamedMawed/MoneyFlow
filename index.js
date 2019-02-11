/** @format */
import React, { Component } from 'react'
import ReactNative,{ AppRegistry, View, StatusBar, ScrollView } from 'react-native';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { name as appName } from './app.json';
import { AppReducer } from './App/state/reducer';
import Navigator from './App/Screen/TabNavigator'
import { Colors, Width, Height } from './App/Global';
import configureStore from './App/state/store';
import { combineReducers } from 'redux';
import { AddBudget } from './App/Screen/AddBudget';
import { BudgetList } from './App/Screen/BudgetList';
import { CustomToast } from './App/Components/CustomToast';

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
appReducer = persistReducer(userPersistConfig, mainReducer);
const { store, persistor } = configureStore(appReducer)

store.subscribe(() => {
    //console.log("TAG","storeState",store.getState())
})
class MainApp extends Component {
    componentWillMount(){
        ReactNative.I18nManager.forceRTL(true)
    }
    render() {
        return (
            <ScrollView style={{
                width: Width,
                height: '100%',
            }}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: Width,
                }}
            >
                <View style={{
                    width: '100%',
                    height: Height*.965
                }}>
                    <StatusBar
                        backgroundColor={Colors.greenlite}
                    />
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <Navigator />
                        </PersistGate>

                    </Provider>
                    <CustomToast />
                </View>
            </ScrollView>
        )
    }
}

AppRegistry.registerComponent(appName, () => MainApp);



// rules 
// 1) for payment periods : 0 for weekly , 1 for monthly , 2 yearly
