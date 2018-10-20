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


class HomeProgressBarItem extends Component {
    CalcColor = () => {

    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.75} onPress={this.props.onClick} style={styles.ItemRow}>

                    {/* for item Icon */}
                    <View style={[styles.ItemIconContainer,{backgroundColor: this.props.BackColor,}]}>
                        <Image source={this.props.Source} style={styles.ItemIcon} />
                    </View>

                    {/* for item Header and remaingin time */}
                    <View style={styles.HeaderContainer}>
                        <Text style={styles.HeaderTitle}>Buying New Car</Text>
                        <Text style={styles.HeaderRemainingDays}>35 Remaingin Days</Text>
                    </View>

                    {/* for item Cost */}
                    <View style={[styles.ItemCostContainer, { borderColor: this.props.BackColor, }]}>

                        <Text style={[styles.ItemCostText,{color: this.props.BackColor}]}
                        >{this.props.cost}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.ProgressBarContainer}>
                    <View style={{elevation:2, width: Width * .9 * (this.props.Percent / 100),height:'100%', backgroundColor: this.props.BackColor }} />
                </View>
            </View>
        )
    }
}






const styles = StyleSheet.create(
    {
        container: {
            paddingTop: Height*.01,
            width: Width * .94,
            height: Height * .1,
            borderRadius: Width * .02,
            marginTop: Height*.02,
            elevation: 1.5,
            // backgroundColor: 'red',
            justifyContent: 'center',
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
            width:'100%'
        },
        HeaderTitle: {
            fontFamily: FontFamilies.Etisalat_0,
            fontSize: FontSize.LargFontSize,
            color: '#000',
            width:'100%',
            textAlign: 'left',
        },
        HeaderContainer: {
            width: Width * .45,
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        ProgressBarContainer: {
            width: Width*.94,
            height: Height * .01,
            alignItems: 'flex-start',
            elevation:1.5,
            // backgroundColor: 'red',
            position: 'absolute',
            bottom:0
        },
        ItemRow: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
            paddingTop: Height*.005,
            overflow:'hidden',
            // alignItems: 'center',
            height: Height * .085,

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