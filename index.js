/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Login } from './App/Screen/Login';
import { Register } from './App/Screen/Register';
import { Intro } from './App/Screen/Intro';
import { NavigationsScreen } from './App/Global/NavigationsScreen';
import Navigator from './App/Screen/TabNavigator'

AppRegistry.registerComponent(appName, () => Navigator);
