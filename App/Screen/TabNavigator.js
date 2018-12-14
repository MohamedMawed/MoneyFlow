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
import Home  from './Home'
import { ExportTab } from './Export';
import { EditProfile } from './EditProfile';
import { Intro } from './Intro';
import { AddBudget } from './AddBudget';
import { add_plan } from './add_plan'
import { Setting } from './Setting';
import { plan } from './plan';
import AddIncome from './addIncome';

const Tabs = createBottomTabNavigator(
    {
        Home: Home,
        Plan: add_plan,
        Plus: AddIncome,
        Report: AddBudget,
        Setting: Setting,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let myTintColor = tintColor
                if (routeName == 'Plus') myTintColor = null
                let IconWidth = routeName == 'Plus' ? Width * .11 : Width * .06

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
        Main: { screen: Tabs },
        Login: { screen: Login },
        Intro: { screen: Intro },
        Register: { screen: Register },
        EditProfile:{screen:EditProfile},
        ExportTab:{screen:ExportTab},
        plan:{screen : plan},

    }, {
        headerMode: 'none'
    }
)