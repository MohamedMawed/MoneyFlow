import * as React from 'react'

import { createBottomTabNavigator, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import {
    Image,
    Text,
    View
} from "react-native";
import { Width, Height } from './../Global/Dimension'
import { Requires } from '../Assets/Requires';
import { Login } from './Login';
import { Splash } from './Splash';

import { Register } from './Register';
import { Home } from './Home'
import { ExportTab } from './Export';
import { EditProfile } from './EditProfile';
import { Intro } from './Intro';
import { AddBudget } from './AddBudget';

const Tabs = createBottomTabNavigator(
    {
        Home: Home,
        Plan: Register,
        Plus: EditProfile,
        Report: ExportTab,
        Setting: AddBudget,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let myTintColor = tintColor
                if (routeName == 'Plus') myTintColor = null
                let IconWidth = routeName == 'Plus' ? Width * .11 : Width * .06
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons

                return <Image source={Requires[routeName]}
                    style={{
                        width: IconWidth,
                        height: IconWidth,
                        resizeMode: 'contain',
                        tintColor: myTintColor
                    }} />
                // return <Text>fsdfds</Text>
            },
            tabBarLabel: () => null
        }),
        tabBarOptions: {
            activeBackgroundColor: '#F0F0F0',
            activeTintColor: 'red',
            inactiveTintColor: null
        },
    }
);


export default App = createStackNavigator(
    {
        Splash: { screen: Splash },
        Intro : {screen : Intro},
        Login: { screen: Login },
        Register: { screen: Register },
        Main: { screen: Tabs }
    }, {
        headerMode: 'none'
    }
)