import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity, AsyncStorage
} from 'react-native'
import { CustomTextInput } from '../Components/TextInput';
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import { Colors } from '../Global/Colors';
import ModalDropdown from 'react-native-modal-dropdown';
import DropDown from '../Components/DropDown';
import { NavigationActions, StackActions } from 'react-navigation'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { FixViewsOrder } from '../Global/Localization';
import { strings, setAppLanguage, getAppLanguage, isArabic } from '../locals';
import firebase from 'react-native-firebase';

class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Indexlang: -1,
            data: [{ text: strings('Arabic'), Icon: Requires.Egypt }, { text: strings('English'), Icon: Requires.America }]
        }
    }

    componentWillMount = () => {

        const lang = getAppLanguage()
        if (lang) {
            if (lang == 'ar')
                this.setState({ Indexlang: 0 })
            else
                this.setState({ Indexlang: 1 })
        }
    }
    render() {
        let { Indexlang, data } = this.state
        return (
            <View style={styles.container}>
                <Image source={Requires.settings_large} style={styles.settingsLogo} />
                <View style={{
                    width: Width,
                    height: '40%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('EditProfile')} style={styles.Button}>
                        <Text style={[{ fontFamily: FontFamilies.Etisalat_0, fontSize: 13, color: Colors.DarkGrayColor }]}>{strings('accountset')}</Text>

                        <EvilIcons name={'chevron-' + [isArabic() ? 'left' : 'right']} size={Width * .1} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity activeOpacity={0.7} onPress={()=>this.props.navigation.navigate('ExportTab')} style={styles.Button}>
                        <Text style={styles.textButton}>{strings('exportImport')}</Text>
                        <EvilIcons name='chevron-right' size={Width * .1} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Button}>
                        <Text style={styles.textButton}>{strings('accountset')}Sync with drive</Text>

                        <View style={{ width: Width * .1, height: Width * .1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.red, borderRadius: Width * .1, position: 'absolute', top: -Width * .03, right: Width * .03 }}>
                            <Text style={{ fontSize: Width * .02, color: Colors.WhiteColor }}>{strings('accountset')}Pro</Text>
                        </View>
                    </TouchableOpacity> */}

                    {/* <DropDown
                        onSelect={(index) => {

                         }}
                        TintColor
                        defaultValue={strings('changeCur')}
                        Data={[{ text: 'EGY', Icon: Requires.money1 }, { text: 'USD', Icon: Requires.money2 }]}
                        Width={Width * .9}
                        DropdownWidth={Width * .9} /> */}
                    <DropDown
                        returnIndex
                        onSelect={(index) => {
                            if (Indexlang == index)
                                return
                            else {
                                if (index == 0)
                                    setAppLanguage('ar')
                                if (index == 1)
                                    setAppLanguage('en');
                            }
                        }}
                        defaultIndex={Indexlang}
                        defaultValue={Indexlang < 0 ? strings('changeLang') : data[Indexlang].text}
                        Data={data}
                        Width={Width * .9}
                        DropdownWidth={Width * .9} />
                </View>

                <TouchableOpacity onPress={async () => {
                    firebase.auth().signOut();
                    await AsyncStorage.clear();
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Login' })],
                    });
                    this.props.navigation.dispatch(resetAction);
                }} style={{ elevation: 2, width: Width * .9, backgroundColor: Colors.red, height: Height * .07, borderRadius: Width * .09, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, color: Colors.WhiteColor, fontFamily: FontFamilies.Etisalat_0 }}>{strings('logout')}</Text>
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
            backgroundColor: '#f6f6f6',
            alignItems: 'center',
            overflow: 'hidden',
        },
        settingsLogo: {
            resizeMode: 'contain',
            width: Width * .4,
            marginVertical: Height * .05,
            height: Height * .2, marginTop: Height * .1
        },
        Button: {
            marginBottom: Height * .04,
            width: Width * .9, height: Height * .07, borderRadius: Width * .1, backgroundColor: '#FAFAFA', paddingHorizontal: Width * .04, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'
        },
        textButton: {

            fontFamily: FontFamilies.Etisalat_0, fontSize: Width * .04, textAlign: 'center'
        }
    }
)
export { Setting }