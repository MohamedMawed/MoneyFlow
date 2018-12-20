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
import { getSavedMonthlyIncome, getSavedMonthlyExpenses } from '../Global/API';
import { strings } from '../locals';


class HomeMonthsSwiperComponent extends Component {
    render() {
        return (
            <View style={{
                width: Width * .94,
                height: Height * .22,
                borderRadius: Width * .03,
                paddingVertical:Height*.02,
                marginTop:Height*.04,
                elevation: 2,
                // shadowColor:'red',
                justifyContent:'space-around',
                alignItems:'center'
            }}>
                <View style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderRadius: Width * .1,
                    borderColor:'red',
                    width: Width * .8,
                    height: Height * .06,
                    alignItems:'center',
                    justifyContent:'space-evenly'

                }}>
                   <TouchableOpacity>
                    <Image source={Requires.arrow_left} style={{
                        width: Width * .03,
                        tintColor: 'red',
                        resizeMode: 'contain'
                    }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontFamily:FontFamilies.Etisalat_0,
                        fontSize:FontSize.LargFontSize,
                        color:'red',
                        textAlign:'center',
                        width:Width*.45
                    }}
                    
                    >Nov 2018</Text>
                    <TouchableOpacity>
                    <Image source={Requires.arrow_right} style={{
                        width: Width * .03,
                        tintColor: 'red',
                        resizeMode: 'contain'
                    }} />
                    </TouchableOpacity>
                </View>
                <Text style={{
                        fontFamily:FontFamilies.Etisalat_0,
                        fontSize:FontSize.LargFontSize,
                        color:'gray',
                        textAlign:'center',
                        width:Width*.45
                    }}
                    > {strings('inWallet')}</Text>
                <View style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderRadius: Width * .1,
                    backgroundColor: Colors.AppGreenColor,
                    width: Width * .4,
                    height: Height * .06,
                    alignItems:'center',
                    justifyContent:'center'


                }}>
                
                    <Text style={{
                        fontFamily:FontFamilies.Etisalat_0,
                        fontSize:FontSize.VeryLargFontSize,
                        color:'white',
                        textAlign:'center',
                        // width:Width*.2,
                    }}
                    >{getSavedMonthlyIncome()-getSavedMonthlyExpenses()}</Text>
        
                </View>

            </View>
        )
    }
    componentDidMount(){

        console.log("getSavedMonthlyExpensesgetSavedMonthlyExpensesgetSavedMonthlyExpenses")
    }
}
export { HomeMonthsSwiperComponent }