import { AsyncStorage } from 'react-native'
import { BaseUrl } from './BaseUrl';
var UserProfile1 = null;
var UserData1 = null;

var monthlyIncome = 10;

export const getSavedMonthlyIncome = ()=>{
    return monthlyIncome;
}
export const setSavedMonthlyIncome = async(val)=>{
    monthlyIncome = val
    await AsyncStorage.setItem('Income',val.toString());
}

var monthlyExpenses = 0;

export const getSavedMonthlyExpenses = ()=>{
    return monthlyExpenses;
}
export const setSavedMonthlyExpenses = async(val)=>{
    monthlyExpenses = val
    await AsyncStorage.setItem('Expenses',val.toString());
}

var HomeScreen = null;
export const getHomeScreen =()=>HomeScreen;
export const setHomeScreen =(pt)=>HomeScreen=pt;


export const GetUserProfile = async () => {
    AsyncStorage.getItem("UserProfile").then(
        async (value) => {
            console.log(JSON.parse(value), "ssssssssssssssssssss")

            if (value == null) {

                const AcountData = await AsyncStorage.getItem("AcountData")
                if (AcountData != null) {

                    const User = JSON.parse(AcountData)
                    UserData1 = User
                    let resp = await fetch(BaseUrl + "profile/", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + User.token
                        }
                    })
                    let UserProfile = await resp.json()

                    if (UserProfile != null) {
                        UserProfile1 = UserProfile
                    }

                }
            }
            else {

                const res = await AsyncStorage.getItem("AcountData")
                UserData1 = JSON.parse(res)
                UserProfile1 = JSON.parse(value)
            }

        }).catch(async (error) => {

        })



}
export let LocalGetUserProfile = () => {

    return [UserProfile1, UserData1]

}

export let _key = (new Date().getMonth().toString() + new Date().getFullYear().toString()).toString()