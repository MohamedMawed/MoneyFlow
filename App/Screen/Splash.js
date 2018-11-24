import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar } from 'react-native'
import { Width, Height } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import LinearGradient from 'react-native-linear-gradient'
import { Requires } from '../Assets/Requires';
import { NavigationActions, StackActions } from 'react-navigation'
import { FontFamilies, FontSize } from '../Global';
import firebase from 'react-native-firebase';
import { setGlobalUser } from '../Global/API';
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
                fontFamily: FontFamilies.Etisalat_0,
                fontSize: 22,
                color: '#fff',
                fontWeight: '500',
            }}>FLOOSY</Text>
        </LinearGradient>
        )
    }
    componentDidMount = async () => {
        // firebase.auth().signOut();
        // await AsyncStorage.clear();
        let firstTime = await AsyncStorage.getItem('FirstTime');
        let income = await AsyncStorage.getItem('Income');
        // let expenses = await AsyncStorage.getItem('Expenses');
        let user = await AsyncStorage.getItem('User');
        this.copyLastIncomeToNewMonth()
        let Screen = 'Intro'
        if (firstTime != null && user == null) {
            Screen = 'Login'
        }
        else if (user != null) {
            Screen = 'Main'
        }
        else
            firebase.auth().onAuthStateChanged((user) => {
                this.setState({ user });
                if (user != null) {
                    Screen = 'Main';
                    setGlobalUser(user._user)
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


    async copyLastIncomeToNewMonth() {
        let _key = (new Date().getMonth().toString() + new Date().getFullYear().toString()).toString()
        let new_key = ((new Date().getMonth() - 1).toString() + new Date().getFullYear().toString()).toString()
        let storeIncome = await AsyncStorage.getItem('Incomedata' + _key)
        let TotalCost = 0
        let Budget = await AsyncStorage.getItem('Budget' + _key)
        let Plan = await AsyncStorage.getItem('Plan' + _key)

        // GET TOTAL COST FROM BUDGETS--------------
        if (Budget) {
            let _Budget = JSON.parse(Budget)
            _Budget.forEach((element) => {
                TotalCost = TotalCost + element.Budget
            })
        }
        // GET TOTAL COST FROM PLANS----------------
        if (Plan) {
            let _Plan = JSON.parse(Plan)
            _Plan.forEach((element) => {
                TotalCost = TotalCost + element.target
            })
        }

        if (storeIncome == null) {
            let lastIncome = await AsyncStorage.getItem('Incomedata' + new_key)
            if (lastIncome) {
                AsyncStorage.setItem('Incomedata' + _key, lastIncome)
            }
        } else {
            let _data = JSON.parse(storeIncome)
            let totalValue = 0
            _data.forEach(element => {
                totalValue = totalValue + element.IncomeValue
            });
            setSavedMonthlyIncome(totalValue);
            setSavedMonthlyExpenses(TotalCost)
        }


    }
}
const Styles = StyleSheet.create({
    Container: {
        width: Width, height: Height, backgroundColor: Colors.WhiteColor, alignItems: 'center', justifyContent: 'center',
    }
})
export { Splash } 