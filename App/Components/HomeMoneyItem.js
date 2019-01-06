import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native'
import { Width, Height } from '../Global/Dimension';
import { FontFamilies, FontSize } from '../Global/Font';


class HomeMoneyItem extends Component {
    render() {
        return (
            <View style={{
                width: Width * .46,
                height: Height * .12,
                borderRadius: Width * .02,
                paddingVertical: Height * .02,
                backgroundColor: '#fff',
                elevation: 2,
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <Image source={this.props.Source} style={{
                    resizeMode: 'contain',
                    width: Width * .09,
                    position: 'absolute',
                    top: -Height * .03,
                    right: Width * .05

                }} />
                <Text style={{
                    fontFamily: FontFamilies.Etisalat_0,
                    fontSize: 16,
                    color: 'gray',
                    textAlign: 'center',
                    width: Width * .45,marginTop:Height*.01
                }}
                >{this.props.Title}</Text>
                <View style={{
                    flexDirection: 'row',
                    // width: Width * .4]4,
                    height: Height * .06,
                    alignItems: 'center',
                    justifyContent: 'space-around', marginTop: Height * .01
                }}>
                    <Text style={{
                        fontFamily: FontFamilies.Etisalat_0,
                        fontSize: 20,
                        color: this.props.color,
                        textAlign: 'center',
                        // width:Width*.2
                    }}
                    >{this.props.value}</Text>
            
                </View>

            </View>
        )
    }
}
export { HomeMoneyItem }