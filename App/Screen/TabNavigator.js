import * as React from 'react'

import { createBottomTabNavigator, createTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import {
    Image,
    Text,
    View
} from "react-native";
import { Width, Height } from './../Global/Dimension'
import { Requires } from '../Assets/Requires';
import { Login } from './Login';
import { Register } from './Register';
import {Home} from './Home'
import { ExportTab } from './Export';
import { EditProfile } from './EditProfile';
export default createBottomTabNavigator(
    {
        Home: EditProfile,
        Plan: Register,
        Plus: Register,
        Report: ExportTab,
        Setting: Register,
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