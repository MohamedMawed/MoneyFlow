import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Platform, ScrollView,AsyncStorage
} from 'react-native'
import { CustomTextInput } from '../Components/TextInput';
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import {setGlobalUser} from './../Global/API';
import { Colors } from '../Global/Colors';
import firebase from 'react-native-firebase';
firebase.initializeApp();
import { NavigationActions, StackActions } from 'react-navigation'
import CustomToast from '../Components/CustomToast';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import Auth from './auth';
const fbLoginPermissions = ['email'];
import { connect } from 'react-redux';

import { FBLoginManager } from 'react-native-facebook-login'
import { strings } from '../locals';
import { AppReducer } from './../state/reducer';
const setAppData = AppReducer.setAppData;
if (Platform.OS === "android") {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native); // defaults to Native

} else {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); // defaults to Native

}
FBLoginManager.logout(() => { });

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '168676012959-rh0m629s8grco9e7hsnae2ftmfbkpvir.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

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
            global.openToast('Email Required')
            return
        }

        if (Password === '') {
            global.openToast('Password Required')
            return
        }
        this.setState({ Loading: true })
        firebase.auth().signInWithEmailAndPassword(Email, Password).then((User) => {
            this.setState({ User: User, Loading: false })

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })],
            });
            // AsyncStorage.setItem('User',JSON.stringify(User))
            //console.log('myUserrrrrrrr'+User.user.uid);
            let snapshot = firebase.database().ref('/'+User.user.uid);
            
            snapshot.once('value',(snapshot)=>{
                console.log('snapSHOTTTTTTT',snapshot);
                this.props.LoadUserData(snapshot._value);
            this.props.navigation.dispatch(resetAction);
            })
        }).catch((error) => {
            
            switch (error.code) {
                case 'auth/invalid-email':
                    global.openToast('invalid email')
                    break;
                case 'auth/user-disabled':
                    global.openToast('this account has been deactivited')
                    break;
                case 'auth/user-not-found':
                    global.openToast('email not found please register')
                    break;
                default:
                    global.openToast('Wrong Password')

                // handle other codes ...
            }
            this.setState({ CloseAlert: true, Loading: false })
        })
    }
    GoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const data = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
            console.info(JSON.stringify(currentUser.user.toJSON()));
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })],
            });
            AsyncStorage.setItem('User',JSON.stringify(currentUser.user.toJSON()))
            this.props.navigation.dispatch(resetAction);

        } catch (error) {
            // alert(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
            }
        }
    }
    render() {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: '#fff', }}>
                <ScrollView  >
                    <View style={{ width: Width, height: Height * .35, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={Requires.Logo} style={{ width: Width * .3, resizeMode: 'contain' }} />
                        <Text style={{
                            fontFamily: FontFamilies.Etisalat_0,
                            fontSize: Width * .07,
                            color: '#000',
                        }}>{strings('Login')}</Text>
                    </View>
                    <View style={{
                        width: Width,
                        height: Height * .6,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                    }}>

                        <CustomTextInput
                            Title={strings('email')}
                            onChangeText={(text) => {
                                this.setState({ Email: text })
                            }}
                            icon={Requires.Email}
                        />
                        <CustomTextInput
                            Title={strings('password')}
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
                                fontSize: Width * .035,
                                color: '#000',
                                textDecorationLine: 'underline'
                            }}>{strings('forgetPassword')}</Text>
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
                                    width:Width*.53,
                                    paddingHorizontal: Width * .06
                                }}>

                                {this.state.Loading == true ?
                                    <ActivityIndicator size={'small'} color={'#fff'} />
                                    :
                                    <Text style={{
                                        fontFamily: FontFamilies.Etisalat_0,
                                        fontSize: Width * .035,
                                        color: Colors.WhiteColor,
                                    }}>{strings('Login')}</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => this.props.navigation.navigate('Register')}
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
                                    fontSize: Width * .035,
                                    color: Colors.BtnLoginBack,
                                }}>{strings('Register')}</Text>
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
                                onPress={async() => {
                                    try {
                                       await Auth.Facebook.logout();
                                        Auth.Facebook.login(["email", "public_profile"])
                                        .then(async(token) => {
                                            //console.log(token)
                                            const credential = firebase.auth.FacebookAuthProvider.credential(token);
                                            const currentUser = await firebase.auth().signInWithCredential({ providerId:credential.providerId,token: credential.token,secret: credential.secret})
                                            // setGlobalUser(currentUser._user);
                                            const resetAction = StackActions.reset({
                                                index: 0,
                                                actions: [NavigationActions.navigate({ routeName: 'Main' })],
                                            });
                                            
                                            firebase.database().ref('/'+currentUser.uid).once('val',(snapshot)=>{
                                                this.props.LoadUserData(snapshot);
                                            })
                                            this.props.navigation.dispatch(resetAction);

                                        })
                                        .catch((err) => console.log(err))
                                    } catch (error) {
                                        //console.log('MAWWWEEEDD', error)
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
                                    fontSize: Width*.035,
                                    color: Colors.WhiteColor,
                                }}>{strings('fbLogin')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
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
                                    paddingHorizontal: Width * .06,paddingRight:Width*.01
                                }}>
                                <Image source={Requires.Google} style={{
                                    width: Width * .06,
                                    height: '100%',
                                    resizeMode: 'contain'
                                }} />
                                <Text style={{
                                    fontFamily: FontFamilies.Etisalat_0,
                                    margin: Width * .02,
                                    fontSize: Width*.035,
                                    color: Colors.WhiteColor,
                                }}>{strings('googleLogin')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    // //console.log("TAG", "previous profile", state)
   
    return {
      income: state.appReducer.income,
    //   onBoardingDataLoaded: state.userReducer.onBoardingDataLoaded,
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      LoadUserData : (value) => dispatch(setAppData(value)),
    }
  }
  
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)