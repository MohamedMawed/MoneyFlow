import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import { Height, Width } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import { Requires } from '../Assets/Requires';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Lang, FixViewsOrder } from '../Global/Localization';
import { FontFamilies } from '../Global/Font';
class AddBudget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CurantSelected: -1,
            sliderOneValue: [10000],
            valueSlider: 3500
        }
    }
    render() {

        //   <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={Styles.Container}>
        // </LinearGradient>
        let { CurantSelected } = this.state
        let text = ['food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food',]
        return (<View style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: '#fff',
        }}>
            {/* //header */}
            <View style={[Styles.Header, {
                width: '100%',
                height: Height * .08,
                backgroundColor: Colors.WhiteColor,
                flexDirection: 'row',
                justifyContent: 'space-around'
            }]}>

                <View style={{ width: '75%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    {/* <TouchableOpacity >
                        <Image source={Requires.back} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity> */}
                    <Text style={[Styles.TextStyle, { width: '85%', textAlign: 'left' }]}>New Budget</Text>


                </View>

                <View style={{ width: '25%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>

                    {/* <TouchableOpacity >
                        <Image source={Requires.remove} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: Width * .09, height: Width * .09, borderRadius: Width * .05, backgroundColor: Colors.GrayColor, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={Requires.edit} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity> */}
                </View>

            </View>

            {/* // form enter data */}
            <View style={[Styles.Header, { width: '90%', height: Height * .27, backgroundColor: Colors.WhiteColor, elevation: 7, borderRadius: Width * .03, alignItems: 'center' }]}>

                <View style={{ width: '90%', height: '33%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[Styles.TextStyle, { fontSize: 18 }]}>Budget</Text>
                    <Text style={[Styles.TextStyle, { color: '#7274CD', fontSize: Width * .08 }]}>{this.state.valueSlider}</Text>
                </View>

                {/* //slider */}
                <View style={{ width: '100%', height: '30%', alignItems: 'center' }}>

                    <MultiSlider
                        values={[this.state.valueSlider]}
                        sliderLength={Width * .8}
                        min={0}
                        step={1}
                        max={10000}
                        snapped
                        selectedStyle={{
                            backgroundColor: '#7274CD', height: Width * .02, borderRadius: 4
                        }}
                        trackStyle={{
                            backgroundColor: Colors.GrayColor, height: Width * .02, borderRadius: 4
                        }}
                        customMarker={() => {
                            return (
                                <View
                                    style={{
                                        backgroundColor: Colors.WhiteColor,
                                        width: Width * .07,
                                        height: Width * .07,
                                        borderColor: '#DDDDDD',
                                        borderWidth: 1,
                                        borderRadius: Width * .01,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                />
                            );
                        }}
                        onValuesChange={(values) => {
                            console.log(values, "ssssssssssssssddd")
                            this.setState({ valueSlider: values[0] })
                        }}
                    //    onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                    />


                </View>
                <View style={{ width: '90%', height: '30%', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={.5} style={{ width: '48%', height: '60%', borderRadius: Width * .02, borderColor: '#D7D7D7', borderWidth: 1, flexDirection: FixViewsOrder(), justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', paddingHorizontal: Width * .03 }}>
                        <Text style={[Styles.TextStyle, { width: '60%', color: '#D7D7D7' }]}>start date</Text>
                        <View style={{ width: 1, height: '100%', backgroundColor: '#D7D7D7' }} />
                        <Image source={Requires.claender} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={.5} style={{ width: '48%', height: '60%', borderRadius: Width * .02, borderColor: '#D7D7D7', borderWidth: 1, flexDirection: FixViewsOrder(), justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', paddingHorizontal: Width * .03 }}>
                        <Text style={[Styles.TextStyle, { width: '60%', color: '#D7D7D7' }]}>end date</Text>
                        <View style={{ width: 1, height: '100%', backgroundColor: '#D7D7D7' }} />
                        <Image source={Requires.claender} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />

                    </TouchableOpacity>


                </View>


            </View>

            {/* // TITLE CHOOSE ICON */}
            <View style={[Styles.Header, { width: '90%', height: Height * .05, marginTop: Height * .03 }]}>
                <Text style={Styles.TextStyle}>{'category'}</Text>
            </View>


            <View style={[Styles.Header, { width: '100%', height: Height * .48, marginVertical: 5 }]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={4}
                    contentContainerStyle={{ width: '100%', justifyContent: 'space-between' }} data={Requires.ICons} renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: '25%', alignItems: 'center', marginBottom: Height * .01, justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.setState({ CurantSelected: index })} activeOpacity={.8} style={{ width: Width * .1, height: Width * .15, alignItems: 'center', justifyContent: 'space-between', marginVertical: Height * .015, elevation: CurantSelected == index ? 0 : 5 }}>
                                    <View style={{ width: Width * .14, height: Width * .14, backgroundColor: CurantSelected == index ? Colors.AppBlueColor : Colors.WhiteColor, borderRadius: Width * .02, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={item} resizeMode='contain' style={{ width: '60%', height: '60%', tintColor: CurantSelected == index ? Colors.WhiteColor : Colors.DarkGrayColor }} />
                                    </View>
                                    <Text style={[Styles.TextStyle, { fontSize: 16, marginTop: Height * .001, color: CurantSelected == index ? Colors.AppBlueColor : Colors.DarkGrayColor }]}>{text[index]}</Text>
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
        fontFamily: FontFamilies.Etisalat_0,
        color: Colors.BlackColor,
        fontSize:17
    }
})
export { AddBudget } 