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


class EditProfile extends Component {
    render() {
        return (
            <View style={{ width: Width, height: Height,backgroundColor:'#fff' }}>
                <View style={{ width: Width, height: Height * .35, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Requires.Logo} style={{ width: Width * .42, resizeMode: 'contain' }} />
                    <Text style={{
                        fontFamily: FontFamilies.Etisalat_0,
                        fontSize: Width * .07,
                        color: '#000',
                    }}>Edit Profile</Text>
                </View>
                <View style={{
                    width: Width,
                    height: Height * .5,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}>
                    <CustomTextInput
                        Title={'Name'}
                        onChangeText={(text) => {
                            console.log(text)
                        }}
                        icon={Requires.User}
                    />
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
                        width: Width * .9,
                        justifyContent: 'center',
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
                            width:'100%',
                            paddingHorizontal: Width * .06
                        }}>
                            <Text style={{
                                fontFamily: FontFamilies.Etisalat_0,
                                fontSize: Width * .05,
                                color: Colors.WhiteColor,
                            }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}
export { EditProfile }