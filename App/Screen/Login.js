import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native'
import { CustomTextInput } from '../Components/TextInput';
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import { Colors } from '../Global/Colors';


class Login extends Component {
    render() {
        return (
            <View style={{ width: Width, height: Height }}>
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
                            console.log(text)
                        }}
                        icon={Requires.Email}
                    />
                    <CustomTextInput
                        Title={'Password'}
                        secure
                        onChangeText={(text) => {
                            console.log(text)
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
                        <Text style={{
                            fontFamily: FontFamilies.Etisalat_0,
                            fontSize: Width * .05,
                            color: '#000',
                        }}>Remember Me</Text>
                    </View>
                    <View style={{
                        width: Width * .9,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: Height * .06,
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: Colors.BtnLoginBack,
                            borderRadius: Width * .1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            paddingHorizontal: Width * .06
                        }}>
                            <Text style={{
                                fontFamily: FontFamilies.Etisalat_0,
                                fontSize: Width * .05,
                                color: Colors.WhiteColor,
                            }}>Login</Text>
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
                                margin:Width*.02,
                                height: '100%',
                                resizeMode: 'contain'
                            }} />

                            <Text style={{
                                fontFamily: FontFamilies.Etisalat_0,
                                fontSize: Width * .05,
                                color: Colors.WhiteColor,
                            }}>Login with facebook</Text>
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
                                margin:Width*.02,
                                fontSize: Width * .05,
                                color: Colors.WhiteColor,
                            }}>login with google</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}
export { Login }