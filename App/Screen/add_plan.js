import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { Height, Width } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import { Requires } from '../Assets/Requires';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Lang, FixViewsOrder } from '../Global/Localization';
import { FontFamilies, FontSize } from '../Global/Font';
class add_plan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CurantSelected: 0,
            valueSlider: 0,
            NamePlan:'',
            AmountValue:''

        }
    }
    render() {

        //   <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={Styles.Container}>
        // </LinearGradient>
        let { CurantSelected } = this.state
        let text = ['طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام',]
        return (<View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
            {/* //header */}
            <View style={[Styles.Header, { width: '90%', height: Height * .1, backgroundColor: Colors.WhiteColor, flexDirection: FixViewsOrder(), justifyContent: 'space-between' }]}>

                <View style={{ width: '20%', height: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: FixViewsOrder() }}>
                    <TouchableOpacity >
                        <Image source={Requires.back} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <Image source={Requires.remove} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ width: '50%', height: '100%', alignItems: 'center', justifyContent: 'flex-end', flexDirection: FixViewsOrder() }}>

                    <Text style={[Styles.TextStyle, { marginHorizontal: Width * .04 }]}>اضافة خطة او هدف</Text>

                    <TouchableOpacity style={{ width: Width * .09, height: Width * .09, borderRadius: Width * .05, backgroundColor: Colors.GrayColor, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={Requires.edit} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity>
                </View>

            </View>

            {/* // form enter data */}
            <View style={[Styles.Header, { width: '90%', height: Height * .3, backgroundColor: Colors.WhiteColor, elevation: 7, borderRadius: Width * .03, alignItems: 'center' }]}>


                {/* //inputs */}
                <View style={{ width: '100%', height: '60%', alignItems: 'center' }}>
                    <TextInput autoCorrect={false} value={this.state.NamePlan} onChangeText={(text)=>{
                        this.setState({NamePlan:text})
                    }}  placeholder='اسم الخطة او الهدف' style={{fontSize:Width*.03,fontFamily:FontFamilies.Etisalat_0, width: '90%', height: Height * .065, borderRadius: Width * .03, borderWidth: 1, borderColor: '#D9D9D9', backgroundColor: '#F9F9F9',paddingHorizontal:Width*.03,marginTop:Height*.022 }} />


                    <TextInput autoCorrect={false} value={this.state.AmountValue} onChangeText={(text)=>{
                        this.setState({AmountValue:text})
                    }} keyboardType='numeric' placeholder='ٌقيمة المبلغ' style={{fontSize:Width*.03,fontFamily:FontFamilies.Etisalat_0, width: '90%', height: Height * .065, borderRadius: Width * .03, borderWidth: 1, borderColor: '#D9D9D9', backgroundColor: '#F9F9F9',paddingHorizontal:Width*.03,marginTop:Height*.022 }} />
                </View>
                <View style={{ width: '90%', height: '30%', flexDirection: FixViewsOrder(), justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={.5} style={{ width: '48%', height: '60%', borderRadius: Width * .02, borderColor: '#D7D7D7', borderWidth: 1, flexDirection: FixViewsOrder(), justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', paddingHorizontal: Width * .03 }}>
                        <Text style={[Styles.TextStyle, { width: '60%', color: '#D7D7D7' }]}>تاريخ الانتهاء</Text>
                        <View style={{ width: 1, height: '100%', backgroundColor: '#D7D7D7' }} />
                        <Image source={Requires.claender} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={.5} style={{ width: '48%', height: '60%', borderRadius: Width * .02, borderColor: '#D7D7D7', borderWidth: 1, flexDirection: FixViewsOrder(), justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', paddingHorizontal: Width * .03 }}>
                        <Text style={[Styles.TextStyle, { width: '60%', color: '#D7D7D7' }]}>تاريخ البدء</Text>

                        <View style={{ width: 1, height: '100%', backgroundColor: '#D7D7D7' }} />
                        <Image source={Requires.claender} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity>


                </View>


            </View>

            {/* // TITLE CHOOSE ICON */}
            <View style={[Styles.Header, { width: '90%', height: Height * .05, marginTop: Height * .03 }]}>
                <Text style={Styles.TextStyle}>{'اختر ايقونة معبرة'}</Text>
            </View>


            <View style={[Styles.Header, { width: '90%', height: Height * .35, marginVertical: 5 }]}>
                <FlatList numColumns={4} contentContainerStyle={{ width: '100%', justifyContent: 'space-between' }} data={Requires.ICons} renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.setState({ CurantSelected: index })} activeOpacity={.8} style={{ width: Width * .1, height: Width * .15, alignItems: 'center', justifyContent: 'space-between', marginVertical: Height * .015 }}>
                                <View style={{ width: Width * .1, height: Width * .1, backgroundColor: CurantSelected == index ? Colors.red : Colors.WhiteColor, borderRadius: Width * .02, alignItems: 'center', justifyContent: 'center', elevation: 5 }}>
                                    <Image source={item} resizeMode='contain' style={{ width: '70%', height: '70%', tintColor: CurantSelected == index ? Colors.WhiteColor : Colors.DarkGrayColor }} />
                                </View>
                                {/* <Text style={[Styles.TextStyle, { fontSize: Width * .025, marginTop: Height * .01, color: CurantSelected == index ? Colors.red : Colors.DarkGrayColor }]}>{text[index]}</Text> */}
                            </TouchableOpacity>

                        </View>
                    )
                }} />
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
        fontFamily: FontFamilies.Etisalat_0, color: Colors.BlackColor
    }
})
export { add_plan } 