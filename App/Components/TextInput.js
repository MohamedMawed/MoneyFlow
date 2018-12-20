import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Image,AsyncStorage,
    Text
} from 'react-native'
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import { Colors } from '../Global/Colors';
import { getAppLanguage } from '../locals';

class CustomTextInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Color: 'transparent',
            currentValue: '',
            TextColor: Colors.TextGrayColor,
            background: Colors.BackGrayColor
        }
    }
    onUnFocus = () => {
        if (this.state.currentValue !== '')
            this.setState({ TextColor: Colors.TextGrayColor, Color: '#0000', background: Colors.BackGrayColor })
        else
            this.setState({ TextColor: Colors.TextGrayColor, TextColor: Colors.error, Color: Colors.error, background: '#0000' })

    }
    OnFocus = () => {
        this.setState({ TextColor: Colors.TextgreenColor, Color: Colors.TextgreenColor, background: '#0000' })
    }
    render() {
        let {keyboardType,value}=this.props
        return (
            <View style={[Styles.Container,
            {
                borderColor: this.state.Color,
                backgroundColor: this.state.background,
            }]}
            >
                {/* <Text style={[Styles.Header, { color: this.state.TextColor }]}>{this.props.Title}</Text> */}
                {/* <View style={[Styles.line, { backgroundColor: this.state.Color }]} /> */}
                <TextInput
                value={value}
                keyboardType={keyboardType?keyboardType:'default'}
                    onChangeText={(text) => {
                        this.setState({ currentValue: text })
                        this.props.onChangeText(text)
                  
                    }}
                    secureTextEntry={this.props.secure}
                    placeholder={this.props.Title}
                    underlineColorAndroid={'#0000'}
                    onEndEditing={this.onUnFocus}
                    onSubmitEditing={this.onUnFocus}
                    onFocus={this.OnFocus}
                    style={[Styles.Input,{
                        textAlign : this.props.secure && getAppLanguage() == 'ar'?'right':null
                    }]}
                />
               {!this.props.NotIcon&& <Image source={this.props.icon} style={[Styles.CustomIcon, { tintColor: this.state.TextColor }]} />}
            </View>
        )
    }
}
const Styles = StyleSheet.create({
    Container: {
        width: Width * .9,
        borderRadius: Width * .1,
        height: Height * .069,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        
        borderWidth: 1,
    },
    line: {
        height: Height * .045,
        width: 1.5,
    },
    CustomIcon: {
        width: Width * .05,
        height: '100%',
        resizeMode: 'contain'
    },
    Header: {
        fontFamily: FontFamilies.Etisalat_0,
        fontSize: FontSize.smallFontSize
    },
    Input: {
        fontFamily: FontFamilies.Etisalat_0,
        fontSize: Width*.03,
        color: '#000',
        width: Width * .7,
    }
})
export { CustomTextInput }