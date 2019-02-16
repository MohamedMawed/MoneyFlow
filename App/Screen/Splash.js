import React, { Component } from 'React'
import { Text, Image, I18nManager, AsyncStorage,View, StyleSheet, StatusBar } from 'react-native'
import { Width, Height } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import LinearGradient from 'react-native-linear-gradient'
import { Requires } from '../Assets/Requires';
import { NavigationActions, StackActions } from 'react-navigation'
import { FontFamilies, FontSize, setFont } from '../Global';
import firebase from 'react-native-firebase';
import { setGlobalUser } from '../Global/API';
import I18n, { strings, setAppLanguage } from './../locals';
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
        return (

        <LinearGradient colors={[Colors.greenlite, Colors.GreenColor]} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
           <StatusBar
                        backgroundColor={Colors.greenlite}
                    />
            <Image resizeMode="contain" source={Requires.Logo} style={{ width: '40%' }} />
            <Text style={{
              fontFamily: FontFamilies.Etisalat_0,
                fontSize: 22,
                color: '#fff',
            }}>{strings('appName')}</Text>
        </LinearGradient>

        )
    }
    componentWillMount = async () => {
       //firebase.auth().signOut();
        // await AsyncStorage.clear();
        const lang = await AsyncStorage.getItem('language')
        //console.log("TAG", lang)
        if (lang != null) {
            setAppLanguage(lang, false)
        } else {
            if (I18nManager.isRTL) {
        setAppLanguage("ar", false);
            }else
            {
           setAppLanguage('ar')

            }
        }
         if (lang)
        setFont(lang == 'ar' ? 'GE SS Two Etisalat_0' : 'OpenSans-Regular')
        let firstTime = await AsyncStorage.getItem('FirstTime');
        if (firstTime == null) {
            AsyncStorage.setItem('FirstTime','true');
            setTimeout(() => {

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Intro' })],
                });
                this.props.navigation.dispatch(resetAction);
            }, 3000)
        }
        else
        {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
            if (user != null) {
                Screen = 'Main';
            } else {
                Screen = 'Login'
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
}
export { Splash } 