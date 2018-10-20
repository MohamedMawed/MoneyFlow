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
import DropDown from '../Components/DropDown';

import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { FixViewsOrder } from '../Global/Localization';

class Setting extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={Requires.settings_large} style={styles.settingsLogo} />
                <View style={{
                    width: Width,
                    height: Height * .65,
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>




                    <TouchableOpacity activeOpacity={0.7} onPress={()=>this.props.navigation.navigate('EditProfile')} style={styles.Button}>
                        <Text style={styles.textButton}>Account settings</Text>
                        <EvilIcons name='chevron-right' size={Width * .1} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>this.props.navigation.navigate('ExportTab')} style={styles.Button}>
                        <Text style={styles.textButton}>Export and Import Data</Text>
                        <EvilIcons name='chevron-right' size={Width * .1} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Button}>
                        <Text style={styles.textButton}>Sync with Google</Text>
                        {/* <EvilIcons name='chevron-right' size={Width * .1} /> */}

                        <View style={{ width: Width * .1, height: Width * .1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.red, borderRadius: Width * .1, position: 'absolute', top: -Width * .03, right: Width * .03 }}>
                            <Text style={{ fontSize: Width * .02, color: Colors.WhiteColor }}>Special</Text>
                        </View>
                    </TouchableOpacity>

                    <DropDown
                        onSelect={() => { }}
                        TintColor
                        defaultValue={'Change currency'}
                        Data={[{ text: 'EGY', Icon: Requires.money1 }, { text: 'USD', Icon: Requires.money2 }]}
                        Width={Width * .9}
                        DropdownWidth={Width * .9} />
                    <DropDown
                        onSelect={() => { }}
                        defaultValue={'Change Langage'}
                        Data={[{ text: 'Arabic', Icon: Requires.Egypt }, { text: 'English', Icon: Requires.America }]}
                        Width={Width * .9}
                        DropdownWidth={Width * .9} />

                    <TouchableOpacity style={{
                        width: Width * .9, height: Height * .07, borderRadius: Width * .1, backgroundColor: '#5D5FD5', marginTop: Height * .04, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={[styles.textButton, { color: Colors.WhiteColor }]}>Save</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}






const styles = StyleSheet.create(
    {
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: Colors.WhiteColor,

            alignItems: 'center',
            overflow: 'hidden',
        },
        settingsLogo: {
            resizeMode: 'contain',
            width: Width * .4,
            height: Width * .2, marginTop: Height * .05
        },
        Button: {
            width: Width * .9, height: Height * .07, borderRadius: Width * .1, backgroundColor: '#FAFAFA', paddingHorizontal: Width * .04, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'
        },
        textButton: {
            fontFamily: FontFamilies.Etisalat_0, fontSize: Width * .04, textAlign: 'center'
        }
    }
)
export { Setting }