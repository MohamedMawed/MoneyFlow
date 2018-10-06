import React, { Component } from 'React'
import { StackNavigator } from 'react-navigation'
import { Splash } from '../Screen/Splash';
import { Intro } from '../Screen/Intro';
import { Login } from '../Screen/Login';
import { Register } from '../Screen/Register';
class NavigationsScreen extends Component {
    render() {
        return (
            <NavigationScreen />
        )
    }
}

const NavigationScreen = StackNavigator({
    Splash: { screen: Splash },
    Intro: { screen: Intro },
    Login: { screen: Login },
    Register: { screen: Register },
},
    {
        headerMode: 'none'
    })
export { NavigationsScreen } 