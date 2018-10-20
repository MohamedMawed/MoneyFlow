/** @format */
import React, { Component } from 'react'
import { AppRegistry, View, StatusBar } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Login } from './App/Screen/Login';
import { Register } from './App/Screen/Register';
import { Intro } from './App/Screen/Intro';
import { NavigationsScreen } from './App/Global/NavigationsScreen';
import Navigator from './App/Screen/TabNavigator'
import { Colors } from './App/Global';

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
                <Navigator />
            </View>
        )
    }
}

AppRegistry.registerComponent(appName, () => MainApp);
