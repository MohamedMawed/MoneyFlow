import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { CustomTextInput } from '../Components/TextInput';
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import { Colors } from '../Global/Colors';
import { FixViewsOrder } from '../Global';

export const BudgetItem = ({ onClick, Source, cost,Category,date,payment_period }) => {
    return (
        <View style={[styles.container, { paddingTop: 0 ,height:Height*.13}]}>

            <TouchableOpacity activeOpacity={0.75}  style={[{ height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: FixViewsOrder() }]}>
                
                <View style={{width:Width*.27,height:'100%',alignItems:'center'}} >
                <View style={{width:'70%',height:'50%',flexDirection:FixViewsOrder(),justifyContent:'flex-end',alignItems:'center'}}>
        
                       
                <TouchableOpacity >
                <View style={{width:Width*.08,height:Width*.08,borderRadius:Width*.05,marginHorizontal:5,alignItems:'center',justifyContent:'center',borderColor:Colors.DarkGrayColor,backgroundColor:Colors.GrayColor}}>
                <Image source={Requires.remove} resizeMode='contain' style={{width:'50%',height:'50%',tintColor:Colors.DarkGrayColor}} />
                </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={onClick}>
                <View style={{width:Width*.08,height:Width*.08,borderRadius:Width*.05,marginHorizontal:5,alignItems:'center',justifyContent:'center',backgroundColor:Colors.GrayColor}}>
                <Image source={Requires.edit} resizeMode='contain' style={{width:'50%',height:'50%',tintColor:Colors.DarkGrayColor}} />
                </View>
                </TouchableOpacity>
     
                
          

                </View>

                <View style={[styles.ItemCostContainer, { borderColor: Colors.GreenColor, marginTop: Height * .012 }]}>
                    <Text style={[styles.ItemCostText, { color: Colors.GreenColor }]}
                    >{cost}</Text>
                </View>

                </View>
          

                <View style={{width:Width*.5,height:'70%'}}>
                    <Text style={[{ color: Colors.BlackColor,fontSize:17 }]}>{Category}</Text>
                    <View style={{flexDirection:FixViewsOrder(),justifyContent:'flex-end'}}>
                    <Text style={[styles.ItemCostText, { color: Colors.DarkGrayColor,fontSize:14 }]}>{date}</Text>
                    <Text style={[{ color: Colors.DarkGrayColor,fontSize:12 }]}>Next Date : </Text>
                    </View>
                    <View style={{flexDirection:FixViewsOrder(),justifyContent:'flex-end'}}>
                    <Text style={[styles.ItemCostText, { color: Colors.DarkGrayColor,fontSize:14 }]}>{payment_period}</Text>
                    <Text style={[{ color: Colors.DarkGrayColor,fontSize:12 }]}>Payment Period :</Text>
                    </View>
                </View>



                <View style={{ width: Width * .17, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <View style={[{ backgroundColor: Colors.GreenColor,width:Width*.13,height:Width*.13,alignItems:'center',justifyContent:'center',borderRadius:Width*.1 }]}>
                        <Image source={Source} style={styles.ItemIcon} />
                    </View>
                </View>




            </TouchableOpacity>


        </View>
    )
}





class HomeProgressBarItem extends Component {
    CalcColor = () => {

    }
    render() {
        let { nameCategory, Percent } = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.75} onPress={this.props.onClick} style={styles.ItemRow}>

                    {/* for item Icon */}
                    <View style={[styles.ItemIconContainer, { backgroundColor: this.props.BackColor, }]}>
                        <Image source={this.props.Source} style={styles.ItemIcon} />
                    </View>


                    {/* for item Header and remaingin time */}
                    <View style={styles.HeaderContainer}>
                        <Text style={styles.HeaderTitle}>{nameCategory}</Text>
                        <Text style={styles.HeaderRemainingDays}>{Percent} Remaingin Days</Text>
                    </View>

                    {/* for item Cost */}
                    <View style={[styles.ItemCostContainer, { borderColor: this.props.BackColor, marginTop: Height * .012 }]}>

                        <Text style={[styles.ItemCostText, { color: this.props.BackColor }]}
                        >{this.props.cost}</Text>
                    </View>

                </TouchableOpacity>
                {/*           
                <View style={styles.ProgressBarContainer}>
                    <View style={{ elevation: 2, width: Width * .9 * (this.props.Percent / 100), height: '100%', backgroundColor: this.props.BackColor }} />
                </View> */}

            </View>
        )
    }
}






const styles = StyleSheet.create(
    {
        container: {
            paddingTop: Height * .01,
            width: Width * .94,
            height: Height * .15,
            borderRadius: Width * .02,
            marginTop: Height * .02,
            elevation: 1.5,
            // backgroundColor: 'red',
            // justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },
        ItemCostText: {
            fontFamily: FontFamilies.Etisalat_0,
            fontSize: FontSize.LargFontSize,
            textAlign: 'center',
            width: Width * .2
        },
        ItemCostContainer: {
            flexDirection: 'row',
            borderWidth: 0.7,
            borderRadius: Width * .1,
            width: Width * .23,
            height: Height * .04,
            alignItems: 'center',
            justifyContent: 'space-around'

        },
        HeaderRemainingDays: {
            fontFamily: FontFamilies.Etisalat_0,
            fontSize: FontSize.MediumFontSize,
            color: 'gray',
            textAlign: 'left',
            width: '100%'
        },
        HeaderTitle: {
            fontFamily: FontFamilies.Etisalat_0,
            fontSize: FontSize.LargFontSize,
            color: '#000',
            width: '100%',
            textAlign: 'left',
        },
        HeaderContainer: {
            width: Width * .45,
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        ProgressBarContainer: {
            width: '92%',
            height: Height * .01,
            alignItems: 'flex-start',
            borderRadius: Height * .03, overflow: 'hidden',
            backgroundColor: '#EBEBEB', marginTop: Height * .005

        },
        ItemRow: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
            paddingTop: Height * .005,
            overflow: 'hidden',
            // alignItems: 'center',
            height: Height * .085, marginTop: Height * .01

        },
        ItemIconContainer: {
            width: Width * .11,
            height: Width * .11,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Width * .1,
            overflow: 'hidden'
        },
        ItemIcon: {
            resizeMode: 'contain',
            width: Width * .06,
            height: Width * .06,
            tintColor: '#fff'
        }
    }
)
export { HomeProgressBarItem }