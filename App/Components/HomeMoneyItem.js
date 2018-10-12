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


class HomeMoneyItem extends Component {
    render() {
        return (
            <View style={{
                width: Width * .44,
                height: Height * .11,
                borderRadius: Width * .02,
                paddingVertical:Height*.02,
                elevation: 2,
                // backgroundColor: 'red',
                justifyContent:'space-around',
                alignItems:'center'
            }}>
                <Image source={this.props.Source} style={{
                  resizeMode:'contain',
                  width:Width*.09 ,
                    position: 'absolute',
                    top:-Height*.03,
                    right:Width*.05

                }}/>
                <Text style={{
                        fontFamily:FontFamilies.Etisalat_0,
                        fontSize:FontSize.LargFontSize,
                        color:'gray',
                        textAlign:'center',
                        width:Width*.45
                    }}
                    >{this.props.Title}</Text>
                <View style={{
                    flexDirection: 'row',
                    width: Width * .4,
                    height: Height * .06,
                    alignItems:'center',
                    justifyContent:'space-around'


                }}>
                
                    <Text style={{
                        fontFamily:FontFamilies.Etisalat_0,
                        fontSize:FontSize.VeryLargFontSize,
                        color:this.props.color,
                        textAlign:'center',
                        width:Width*.2
                    }}
                    >7500</Text>
                    <Text style={{
                        fontFamily:FontFamilies.Etisalat_0,
                        fontSize:FontSize.MediumFontSize,
                        color:this.props.color,
                        textAlign:'center',
                        width:Width*.2
                    }}
                    >pounds</Text>
                </View>

            </View>
        )
    }
}
export { HomeMoneyItem }