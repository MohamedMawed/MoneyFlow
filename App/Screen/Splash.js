import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar } from 'react-native'
import { Width, Height } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import LinearGradient from 'react-native-linear-gradient'
import { Requires } from '../Assets/Requires';
import { NavigationActions, StackActions } from 'react-navigation'
import { FontFamilies, FontSize } from '../Global';
import firebase from 'react-native-firebase';
class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {

        //   <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={Styles.Container}>
        // </LinearGradient>

        return (<LinearGradient colors={[Colors.greenlite, Colors.GreenColor]} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image resizeMode="contain" source={Requires.Logo} style={{ width: '40%' }} />
            <Text style={{
                fontFamily:FontFamilies.Etisalat_0,
                fontSize:22,
                color:'#fff',
            }}>Floosy App</Text>
        </LinearGradient>
        )
    }
    componentDidMount = async()=> {
        let firstTime = await AsyncStorage.getItem('FirstTime');
        let User = await AsyncStorage.getItem('User');
        let Screen = 'Intro'
        if(firstTime!= null){
            screen = 'Login'
        }
        if(User != null){
            screen = 'Main'
        }
        

        setTimeout(() => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: Screen })],
            });
            this.props.navigation.dispatch(resetAction);
        }, 2000)
    }
}
const Styles = StyleSheet.create({
    Container: {
        width: Width, height: Height, backgroundColor: Colors.WhiteColor, alignItems: 'center', justifyContent: 'center',
    }
})
export { Splash } 