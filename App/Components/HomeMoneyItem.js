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
                width: Width * .46,
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
                        fontSize:16,
                        color:'gray',
                        textAlign:'center',
                        width:Width*.45
                    }}
                    >{this.props.Title}</Text>
                <View style={{
                    flexDirection: 'row',
                    // width: Width * .4]4,
                    height: Height * .06,
                    alignItems:'center',
                    justifyContent:'space-around'


                }}>
                
                    <Text style={{
                        fontFamily:FontFamilies.Etisalat_0,
                        fontSize:20,
                        color:this.props.color,
                        textAlign:'center',
                        // fontWeight:'f'
                        // width:Width*.2
                    }}
                    >7500</Text>
                    <Text style={{
                        fontFamily:FontFamilies.Etisalat_0,
                        fontSize:15,
                        color:Colors.TextGrayColor,
                        textAlign:'center',
                        paddingLeft:Width*.01
                        // width:Width*.2
                    }}
                    >pounds</Text>
                </View>

            </View>
        )
    }
}
export { HomeMoneyItem }