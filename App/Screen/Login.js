import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Platform
} from 'react-native'
import { CustomTextInput } from '../Components/TextInput';
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import { Colors } from '../Global/Colors';
import firebase from 'react-native-firebase'
import { NavigationActions, StackActions } from 'react-navigation'
import CustomToast from '../Components/CustomToast';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

import  { FBLoginManager } from 'react-native-facebook-login'
if (Platform.OS === "android") {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native); // defaults to Native

} else {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); // defaults to Native

}
FBLoginManager.logout(() => { });


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Email: '',
            Password: '',
            CloseAlert: false,
            User: null
        }
    }
    Massage = ""
    CloseAlert() {
        this.setState({ CloseAlert: false });
    }
    Login = () => {
        const { Email, Password } = this.state
        if (Email === '') {
            this.Massage = 'Email Required'
            this.setState({ CloseAlert: true })
            return
        }

        if (Password === '') {
            this.Massage = 'Password Required'
            this.setState({ CloseAlert: true })
            return
        }
        this.setState({ Loading: true })

        firebase.auth().signInWithEmailAndPassword(Email, Password).then((User) => {
            console.log('yesssssss', User)
            this.setState({ User: User, Loading: false })
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })],
            });
            this.props.navigation.dispatch(resetAction);
        }).catch((error) => {
            switch (error.code) {
                case 'auth/invalid-email':
                    this.Massage = 'invalid email'
                    break;
                case 'auth/user-disabled':
                    this.Massage = 'this account has been deactivited'
                    break;
                case 'auth/user-not-found':
                    this.Massage = 'email not found please register'
                    break;
                default:
                    this.Massage = 'Wrong Password'

                // handle other codes ...
            }
            this.setState({ CloseAlert: true, Loading: false })
        })
    }
    GoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo, provider: 'google' });
            this.setState({ Loading1: true })
            SetSocialProvider('google')

            OnLineCheckSocialUser(userInfo.user.id, 'google', this.OnSuccess, this.OnFail)
            this.signOut()
        } catch (error) {
            alert(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }
    render() {
        return (
            <View style={{ width: Width, height: Height, backgroundColor: '#fff', }}>
                <View style={{ width: Width, height: Height * .35, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Requires.Logo} style={{ width: Width * .42, resizeMode: 'contain' }} />
                    <Text style={{
                        fontFamily: FontFamilies.Etisalat_0,
                        fontSize: Width * .07,
                        color: '#000',
                    }}>Login</Text>
                </View>
                <View style={{
                    width: Width,
                    height: Height * .6,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}>
                    <CustomTextInput
                        Title={'Email Address'}
                        onChangeText={(text) => {
                            this.setState({ Email: text })
                        }}
                        icon={Requires.Email}
                    />
                    <CustomTextInput
                        Title={'Password'}
                        secure
                        onChangeText={(text) => {
                            this.setState({ Password: text })
                        }}
                        icon={Requires.Password}
                    />
                    <View style={{
                        width: Width * .85,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: Height * .06,
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            fontFamily: FontFamilies.Etisalat_0,
                            fontSize: Width * .05,
                            color: '#000',
                            textDecorationLine: 'underline'
                        }}>Forget Password</Text>
                    </View>
                    <View style={{
                        width: Width * .9,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: Height * .06,
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.Login}

                            style={{
                                backgroundColor: Colors.BtnLoginBack,
                                borderRadius: Width * .1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                paddingHorizontal: Width * .06
                            }}>

                            {this.state.Loading == true ?
                                <ActivityIndicator size={'small'} color={'#fff'} />
                                :
                                <Text style={{
                                    fontFamily: FontFamilies.Etisalat_0,
                                    fontSize: Width * .05,
                                    color: Colors.WhiteColor,
                                }}>Login</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>this.props.navigation.navigate('Register')}
                        style={{
                            borderColor: Colors.BtnLoginBack,
                            borderWidth: 1,
                            borderRadius: Width * .1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            paddingHorizontal: Width * .06
                        }}>
                            <Text style={{
                                fontFamily: FontFamilies.Etisalat_0,
                                fontSize: Width * .05,
                                color: Colors.BtnLoginBack,
                            }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: Width * .9,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: Height * .15,
                        marginTop: Height * .04
                    }}>
                        <TouchableOpacity

                            activeOpacity={0.7}
                            onPress={()=>{
                                try{
                                FBLoginManager.loginWithPermissions(["email","public_profile"], (error, data) => {

                                    if (!error) {

                                        alert(JSON.stringify(data))
                                        // OnlineGetFacebookData(data.credentials.userId, data.credentials.token, this.OnSuccessGetSocialFBdata, (errr) => { alert(errr) })
                                        // SetSocialProvider('facebook')
                                        // this.setState({ userInfo: UserData, provider: 'facebook' })
                                        // // alert(JSON.stringify(UserData))
                                        // this.setState({ Loading: true })
                                        // OnLineCheckSocialUser(UserData.id, 'facebook', this.OnSuccess, this.OnFail)
                                    } else {
                                        alert(JSON.stringify(error))
                                    }
                                })
                            }catch(error){
                                console.log('MAWWWEEEDD',error)
                            }
                            }}
                            style={{
                                backgroundColor: Colors.BtnFaceBookBack,
                                borderRadius: Width * .1,
                                justifyContent: 'center',
                                width: Width * .9,
                                alignItems: 'center',
                                height: '46%',
                                paddingHorizontal: Width * .06,
                                flexDirection: 'row',
                            }}>
                            <Image source={Requires.FB} style={{
                                width: Width * .025,
                                margin: Width * .02,
                                height: '100%',
                                resizeMode: 'contain'
                            }} />

                            <Text style={{
                                fontFamily: FontFamilies.Etisalat_0,
                                fontSize: 18,
                                color: Colors.WhiteColor,
                            }}>Login with facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>{
                            this.GoogleLogin()
                        }}
                        style={{
                            backgroundColor: Colors.BtnGoogleBack,
                            borderRadius: Width * .1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '46%',
                            flexDirection: 'row',
                            width: Width * .9,
                            paddingHorizontal: Width * .06
                        }}>
                            <Image source={Requires.Google} style={{
                                width: Width * .06,
                                height: '100%',
                                resizeMode: 'contain'
                            }} />
                            <Text style={{
                                fontFamily: FontFamilies.Etisalat_0,
                                margin: Width * .02,
                                fontSize: 18,
                                color: Colors.WhiteColor,
                            }}>Login with google</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.CloseAlert === true && <CustomToast
                        Massage={this.Massage}
                        CloseAlert={this
                            .CloseAlert
                            .bind(this)}
                        PositionAlert="Left" />}
                </View>

            </View>
        )
    }
}
export { Login }