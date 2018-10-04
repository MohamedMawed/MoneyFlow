import { AsyncStorage } from 'react-native'
import { BaseUrl } from './BaseUrl';
var UserProfile1 = null;
var UserData1 = null;

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