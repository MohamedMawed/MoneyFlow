import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar } from 'react-native'
import { Width, Height } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import LinearGradient from 'react-native-linear-gradient'
import { Requires } from '../Assets/Requires';
import { NavigationActions, StackActions } from 'react-navigation'
import { FontFamilies, FontSize } from '../Global';
import firebase from 'react-native-firebase';
import { setSavedMonthlyIncome, setSavedMonthlyExpenses } from '../Global/API';
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
                fontWeight: '500',
            }}>FLOOSY</Text>
        </LinearGradient>
        )
    }
    componentDidMount = async()=> {
        // firebase.auth().signOut();
        // await AsyncStorage.clear();
        let firstTime = await AsyncStorage.getItem('FirstTime');
        let income = await AsyncStorage.getItem('Income');
        let expenses = await AsyncStorage.getItem('Expenses');
        let Screen = 'Intro'
        if(firstTime!= null){
            Screen = 'Login'
        }else
            firebase.auth().onAuthStateChanged((user) => {
                this.setState({ user });
                if(user != null)
                {
                    Screen = 'Main';
                    setSavedMonthlyIncome(parseFloat(income));
                    setSavedMonthlyExpenses(parseFloat(expenses));
                }
              });
        

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