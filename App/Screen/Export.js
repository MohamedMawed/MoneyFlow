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
import ModalDropdown from 'react-native-modal-dropdown';


class ExportTab extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={Requires.exportLogo} style={styles.ExportLogo} />
                <View style={{
                    width: Width,
                    height: Height * .3,
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: Width * .85,
                        height: Height * .08,
                        borderRadius: Width * .1,
                        backgroundColor: Colors.BackGrayColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}>

                        <ModalDropdown
                        showsVerticalScrollIndicator={false}
                            textStyle={{
                                textAlign: 'left',
                                width: Width * .75,
                                fontFamily: FontFamilies.Etisalat_0,
                                fontSize: 16,
                                // backgroundColor: 'red',
                            }}
                            defaultIndex={-1}
                            defaultValue={'export data as'}
                            animated={false}
                            options={['csv', 'text file']}
                            dropdownStyle={{
                                width: Width * .8,
                                elevation: 2,
                                overflow: 'hidden',
                                height: Height * .117,
                                borderRadius: Width * .03,
                                // dropdownTextStyle:
                            }}
                            dropdownTextHighlightStyle={{
                                backgroundColor: Colors.red,
                                color: '#fff'
                            }}
                            dropdownTextStyle={{
                                fontFamily: FontFamilies.Etisalat_0,
                                fontSize: 16,
                                width: Width * .8,
                                textAlign: 'center'
                            }}

                        />
                        <Image source={Requires.arrow_dropdown} style={{
                            resizeMode: 'contain',
                            width: Width * .037
                        }} />
                    </View>
                    <TouchableOpacity style={{
                        width: Width * .65,
                        height: Height * .07,
                        borderRadius: Width * .1,
                        backgroundColor: Colors.BlueColor,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontFamily: FontFamilies.Etisalat_0,
                            fontSize: 18,
                            width: Width * .7,
                            color: '#fff',
                            textAlign: 'center'
                            // dropdownTextStyle:
                        }}>Export</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{
                    width: Width * .85,
                    height: Height * .07,
                    borderRadius: Width * .1,
                    backgroundColor: Colors.red,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontFamily: FontFamilies.Etisalat_0,
                        fontSize: 18,
                        width: Width * .7,
                        color: '#fff',
                        textAlign: 'center'
                        // dropdownTextStyle:
                    }}>Import From Phone</Text>
                </TouchableOpacity>
            </View>
        )
    }
}






const styles = StyleSheet.create(
    {
        container: {
            width: '100%',
            height: '100%',
            // backgroundColor: 'red',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            overflow: 'hidden',
        },
        ItemCostText: {
            fontFamily: FontFamilies.Etisalat_0,
            fontSize: FontSize.VeryLargFontSize,
            textAlign: 'center',
            width: Width * .2
        },
        ItemCostContainer: {
            flexDirection: 'row',
            borderWidth: 0.7,
            borderRadius: Width * .1,
            width: Width * .25,
            height: Height * .05,
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
            width: Width * .94,
            height: Height * .015,
            alignItems: 'flex-start',
            // backgroundColor: 'red',
            position: 'absolute',
            bottom: 0
        },
        ItemRow: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
            overflow: 'hidden',
            height: Height * .085,

        },
        ItemIconContainer: {
            width: Width * .14,
            height: Width * .14,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Width * .1,
            overflow: 'hidden'
        },
        ExportLogo: {
            resizeMode: 'contain',
            width: Width * .6,
            height: Width * .35,
        }
    }
)
export { ExportTab }