import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Platform, ScrollView, AsyncStorage,Alert
} from 'react-native'
import { CustomTextInput } from '../Components/TextInput';
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import { setGlobalUser } from './../Global/API';
import { Colors } from '../Global/Colors';
import firebase from 'react-native-firebase';
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



class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Email: ''
        }
    }


    Massage = ""
    CloseAlert() {
        this.setState({ CloseAlert: false });
    }
    onForgot = () => {
        let { Email } = this.state
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (Email) {

            if (reg.test(Email) === true) {
                firebase.auth().sendPasswordResetEmail(Email).then((User) => {
                    Alert.alert(strings('success'),strings('PleaseCheckYourEmail'),[{text:strings('ok'),onPress:()=>{
                        this.props.navigation.goBack()
                    }}] )

                }).catch((error) => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            global.openToast(strings('invalidEmail'))
                            break;
                        case 'auth/user-not-found':
                            global.openToast(strings('UserNotFound'))
                            break;

                    }
                    // this.setState({ CloseAlert: true, Loading: false })
                })
            } else {
                global.openToast(strings('enterValidEmail'))

            }
        }
        else {
            global.openToast(strings('enterYourEmail'))

        }

    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: '#fff', alignItems: 'center' }}>
                <View style={{ width: Width, height: Height * .35, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Requires.Logo} style={{ width: Width * .3, resizeMode: 'contain' }} />
                    <Text style={{
                        fontFamily: FontFamilies.Etisalat_0,
                        fontSize: Width * .07,
                        color: '#000',
                    }}>{strings('ResetPassword')}</Text>
                </View>
                <CustomTextInput
                    Title={strings('email')}
                    onChangeText={(text) => {
                        this.setState({ Email: text })
                    }}
                    icon={Requires.Email}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>

                        this.onForgot()

                    }
                    style={{
                        borderColor: Colors.BtnLoginBack,
                        borderWidth: 1,
                        width: Width * .8,
                        borderRadius: Width * .1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: Height * .07,
                        marginTop: Height * .07,
                        paddingHorizontal: Width * .06
                    }}>
                    <Text style={{
                        fontFamily: FontFamilies.Etisalat_0,
                        fontSize: Width * .035,
                        color: Colors.BtnLoginBack,
                    }}>{strings('send')}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        income: state.appReducer.income,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        LoadUserData: (value) => dispatch(setAppData(value)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword)