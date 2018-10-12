import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { Height, Width } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import { Requires } from '../Assets/Requires';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Lang, FixViewsOrder } from '../Global/Localization';
import { FontFamilies, FontSize } from '../Global/Font';
class plan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CurantSelected: 0,
            valueSlider: 0,
            NamePlan: '',
            AmountValue: ''

        }
    }
    render() {

        //   <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={Styles.Container}>
        // </LinearGradient>
        let { CurantSelected } = this.state
        let text = ['طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام',]
        return (<View style={{ width: '100%', height: '100%', alignItems: 'center', backgroundColor: Colors.WhiteColor }}>
            {/* //header */}
            <View style={[Styles.Header, { width: '90%', height: Height * .1, backgroundColor: Colors.WhiteColor, flexDirection: FixViewsOrder(), justifyContent: 'space-between' }]}>

                <View style={{ width: '30%', height: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: FixViewsOrder() }}>
                    <TouchableOpacity >
                        <Image source={Requires.back} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <Image source={Requires.remove} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: Width * .09, height: Width * .09, borderRadius: Width * .05, backgroundColor: Colors.GrayColor, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={Requires.edit} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ width: '50%', height: '100%', alignItems: 'center', justifyContent: 'flex-end', flexDirection: FixViewsOrder() }}>

                    <Text style={[Styles.TextStyle, { marginHorizontal: Width * .04 }]}>اضافة خطة او هدف</Text>

                    <View style={{ width: Width * .09, height: Width * .09, borderRadius: Width * .05, backgroundColor: Colors.GrayColor, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={Requires.car2} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
                    </View>
                </View>

            </View>

            {/* // form enter data */}
            <View style={Styles.perantTextItem} >
                <Text style={Styles.TextStyle}>{'2333'}</Text>
                <Text style={Styles.TextStyle}>{'المبلغ'}</Text>
            </View>


            <View style={Styles.perantTextItem} >
                <Text style={Styles.TextStyle}>{'12-02-2018'}</Text>
                <Text style={Styles.TextStyle}>{'تاريخ البداء'}</Text>
            </View>
            <View style={Styles.perantTextItem} >
                <Text style={Styles.TextStyle}>{'12-06-2018'}</Text>
                <Text style={Styles.TextStyle}>{'تاريخ الانتهاء'}</Text>
            </View>

            <View style={Styles.perantTextItem} >
                <Text style={Styles.TextStyle}>{'39 يوم'}</Text>
                <Text style={Styles.TextStyle}>{'متبقى من الوقت'}</Text>
            </View>
        </View>
        )
    }
    componentDidMount() {
    }
}
const Styles = StyleSheet.create({
    Container: {
        width: Width, height: Height, backgroundColor: Colors.WhiteColor, alignItems: 'center', justifyContent: 'center',
    },
    Header: {

    },
    TextStyle: {
        fontFamily: FontFamilies.Etisalat_0, color: '#5D5D5D'
    },
    perantTextItem: {
        width: '90%', height: Height * .09, backgroundColor: Colors.WhiteColor, alignItems: 'center', borderBottomWidth: 1, borderColor: '#EBEBEB', flexDirection: FixViewsOrder(), justifyContent: 'space-between'
    }
})
export { plan } 