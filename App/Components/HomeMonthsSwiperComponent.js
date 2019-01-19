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
import { connect } from 'react-redux';


class HomeMonthsSwiperComponent extends Component {
    render() {
        return (
            <View style={{
                width: Width * .94,
                height: Height * .19,
                borderRadius: Width * .03,
                paddingVertical:Height*.02,
                marginTop:Height*.04,
                elevation: 2,
                backgroundColor: '#fff',
                // shadowColor:'red',
                justifyContent:'center',
                alignItems:'center'
            }}>
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
                    width: Width * .4,
                    height: Height * .06,
                    alignItems:'center',
                    justifyContent:'center',marginTop:Height*.01


                }}>
                
                    <Text style={{
                        fontFamily:FontFamilies.Etisalat_0,
                        fontSize:45,
                        color:'#7C7DC1',
                        textAlign:'center',
                        // width:Width*.2,
                    }}
                    >{this.props.income - this.props.expense}</Text>
        
                </View>

            </View>
        )
    }
    componentDidMount(){

    }
}

function mapStateToProps(state) {
    //console.log("TAG", "previous profile", state)
   
    return {
      income: state.appReducer.income,
      expense : state.appReducer.expense
    //   onBoardingDataLoaded: state.userReducer.onBoardingDataLoaded,
    }
  }
  
  
  export default connect(
    mapStateToProps
  )(HomeMonthsSwiperComponent)