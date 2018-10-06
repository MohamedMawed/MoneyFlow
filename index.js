/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Splash } from './App/Screen/Splash';
import { Login } from './App/Screen/Login';
import { Register } from './App/Screen/Register';
import { Intro } from './App/Screen/Intro';
import { NavigationsScreen } from './App/Global/NavigationsScreen';
import { AddBudget } from './App/Screen/AddBudget';

AppRegistry.registerComponent(appName, () => AddBudget);
