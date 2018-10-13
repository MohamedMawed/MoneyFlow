import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { CustomTextInput } from '../Components/TextInput';
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import { Colors } from '../Global/Colors';
import firebase from 'react-native-firebase'
import CustomToast from './../Components/CustomToast'
import { NavigationActions, StackActions } from 'react-navigation'

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Name: '',
            Email: '',
            Password: '',
            Loading: false
        }
    }
    Massage = ""
    CloseAlert() {
        this.setState({ CloseAlert: false });
    }
    Register = () => {
        const { Name, Email, Password } = this.state

        if (Name === '') {
            this.Massage = 'Name Required'
            this.setState({ CloseAlert: true })
            return
        }

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

        firebase.auth().createUserWithEmailAndPassword(Email, Password).then((User) => {
            this.setState({ User: User, Loading: false })
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })],
            });
            this.props.navigation.dispatch(resetAction);
        }).catch((error) => {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    this.Massage = 'email aleady exist'
                    break;
                case 'auth/invalid-email':
                    this.Massage = 'invalid email'
                    break;
                case 'auth/weak-password':
                    this.Massage = 'weak password'
                    break;
                default:
                    this.Massage = 'Network Error'

                // handle other codes ...
            }
            this.setState({ CloseAlert: true, Loading: false })

        })
    }
    render() {
        return (
            <View style={{ width: Width, height: Height,backgroundColor: '#fff', }}>
                <View style={{ width: Width, height: Height * .33, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Requires.Logo} style={{ width: Width * .42, resizeMode: 'contain' }} />
                    <Text style={{
                        fontFamily: FontFamilies.Etisalat_0,
                        fontSize: Width * .07,
                        color: '#000',
                    }}>Register</Text>
                </View>
                <View style={{
                    width: Width,
                    height: Height * .55,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}>
                    <CustomTextInput
                        Title={'Name'}
                        onChangeText={(text) => {
                            this.setState({ Name: text })
                        }}
                        icon={Requires.User}
                    />
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
                        width: Width * .9,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: Height * .06,
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.Register}
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
                                }}>Register</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={{
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
                            }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: Width * .9,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: Height * .15,
                        marginTop: Height * .04
                    }}>
                        <TouchableOpacity style={{
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
                                fontSize: Width * .05,
                                color: Colors.WhiteColor,
                            }}>Register with facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
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
                                fontSize: Width * .05,
                                color: Colors.WhiteColor,
                            }}>Register with google</Text>
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
export { Register }