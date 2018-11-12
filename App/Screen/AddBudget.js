import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { Height, Width } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import { Requires } from '../Assets/Requires';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Lang, FixViewsOrder } from '../Global/Localization';
import { FontFamilies, FontSize } from '../Global/Font';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { HomeProgressBarItem } from '../Components/HomeProgressBarItem';
import { PlansGoalsList, PlansGoalsList2 } from '../Global/ComponentTest';
import { HomeMonthsSwiperComponent } from '../Components/HomeMonthsSwiperComponent';
class AddBudget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CurantSelected: -1,
            sliderOneValue: [10000],
            valueSlider: 3500,
            AddBudget: false,
            PlansGoalsList: PlansGoalsList2,
            isDateTimePickerVisible: false,
            startDate: 'Start date',
            endDate: 'End date',
            ButtonType: -1
        }
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {

        let _date = new Date(date).getDate() + '-' + new Date(date).getMonth() + '-' + new Date(date).getFullYear()
        if (this.state.ButtonType == 'start')
            this.setState({ startDate: _date })
        if (this.state.ButtonType == 'end')
            this.setState({ endDate: _date })
        console.log(date, "datedatedatedatedatedate")
        this._hideDateTimePicker();
    };
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
            {this.state.AddBudget && <View style={{ width: '100%', alignItems: 'center' }}>
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
                        <Text style={[Styles.FirstCategoryHeader, { width: '85%', textAlign: 'left' }]}>New Budget</Text>


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
                    <View style={{ width: '90%', height: '30%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({ ButtonType: 'start' })
                            this._showDateTimePicker()
                        }} activeOpacity={.5} style={{ width: '48%', height: Height * .06, borderRadius: Width * .02, borderColor: '#D7D7D7', borderWidth: 1, flexDirection: FixViewsOrder(), justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', paddingHorizontal: Width * .03 }}>
                            <Text style={[Styles.TextStyle, { width: '60%', color: '#D7D7D7' }]}>{this.state.startDate}</Text>
                            <View style={{ width: 1, height: '100%', backgroundColor: '#D7D7D7' }} />
                            <Image source={Requires.claender} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.setState({ ButtonType: 'end' })
                            this._showDateTimePicker()
                        }}
                            activeOpacity={.5} style={{ width: '48%', height: Height * .06, borderRadius: Width * .02, borderColor: '#D7D7D7', borderWidth: 1, flexDirection: FixViewsOrder(), justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', paddingHorizontal: Width * .03 }}>
                            <Text style={[Styles.TextStyle, { width: '60%', color: '#D7D7D7' }]}>{this.state.endDate}</Text>
                            <View style={{ width: 1, height: '100%', backgroundColor: '#D7D7D7' }} />
                            <Image source={Requires.claender} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />

                        </TouchableOpacity>


                    </View>


                </View>

                {/* // TITLE CHOOSE ICON */}
                <View style={[Styles.Header, { width: '90%', height: Height * .05, marginTop: Height * .03 }]}>
                    <Text style={[Styles.TextStyle, { fontSize: Width * .03 }]}>{'Choose Category'}</Text>
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
                                            <Image source={item.icon} resizeMode='contain' style={{ width: '60%', height: '60%', tintColor: CurantSelected == index ? Colors.WhiteColor : Colors.DarkGrayColor }} />
                                        </View>
                                        <Text style={[Styles.TextStyle, { fontSize: Width*.03, marginTop: Height * .001, color: CurantSelected == index ? Colors.AppBlueColor : Colors.DarkGrayColor }]}>{item.text}</Text>
                                    </TouchableOpacity>

                                </View>
                            )
                        }} />
                </View>
            </View>}
            {this.state.AddBudget == false && <View style={{ width: '100%', height: '100%' }}>
                <View style={{ height: '95%', alignItems: 'center' }}>

                    <View style={{ width: '90%', height: Height * .08, justifyContent: 'center' }}>
                        <Text style={Styles.FirstCategoryHeader}>Budgets</Text>
                    </View>



                    {/* // swiper */}
                    <View style={{width:'100%',height:Height*.1,alignItems:'center',justifyContent:'center'}}>
                    <View style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderRadius: Width * .1,
                        borderColor: 'red',
                        width: Width * .9,
                        height: Height * .06,
                        alignItems: 'center',
                        justifyContent: 'space-evenly'

                    }}>
                        <Image source={Requires.arrow_left} style={{
                            width: Width * .03,
                            tintColor: 'red',
                            resizeMode: 'contain'
                        }} />
                        <Text style={{
                            fontFamily: FontFamilies.Etisalat_0,
                            fontSize: FontSize.LargFontSize,
                            color: 'red',
                            textAlign: 'center',
                            width: Width * .45
                        }}

                        >Oct 2018</Text>
                        <Image source={Requires.arrow_right} style={{
                            width: Width * .03,
                            tintColor: 'red',
                            resizeMode: 'contain'
                        }} />
                    </View>
                    </View>
                    {/* // _________________________________________________________ */}



                    <ScrollView
                        contentContainerStyle={{
                            width: Width,
                            // height:Height*.5,
                            // marginBottom: Height * .1,
                            justifyContent: 'center', alignItems: 'center', paddingBottom: Height * .02
                        }}

                    >
                        <View style={{}}>
                            {this.state.PlansGoalsList.map((item, index) => {
                                console.log(index)
                                return (
                                    <HomeProgressBarItem
                                        onClick={() => this.props.navigation.navigate('plan')}
                                        key={index}
                                        cost={item.cost}
                                        Percent={this.CalcPercent(item.startDate, item.endDate)}
                                        BackColor={this.CalcPercentColor(item.startDate, item.endDate)}
                                        Source={item.Icon} />
                                )
                            })
                            }
                        </View>
                    </ScrollView>
                </View>


            </View>}
            <TouchableOpacity onPress={() => {
                this.setState({ AddBudget: !this.state.AddBudget })

                // ios-save
            }} style={{ position: 'absolute', elevation: 7, top: Height * .01, right: Width * .07 }}>
                <Ionicons name={this.state.AddBudget ? 'md-checkmark-circle' : 'md-add-circle'} size={Width * .1} color={Colors.GreenColor} />
            </TouchableOpacity>
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
            />
        </View>
        )
    }
    CalcPercent = (start, end) => {
        // console.log((new Date()).days-10)
        let totdays = Math.abs(new Date(end) - new Date(start));
        // console.log(melli)
        totdays = totdays / 1000 / 60 / 60 / 24
        let tillNow = Math.abs(new Date() - new Date(start));
        tillNow = tillNow / 1000 / 60 / 60 / 24
        console.log('totdays', totdays)
        console.log('tillNow', tillNow)
        console.log('Percent', (tillNow / totdays) * 100)
        // console.log(days)

        return (tillNow / totdays) * 100
    }
    CalcPercentColor = (start, end) => {

        let percent = this.CalcPercent(start, end)
        console.log(percent)
        if (percent <= 33) return Colors.AppGreenColor
        if (percent <= 66) return Colors.AppBlueColor
        if (percent <= 100) return Colors.AppRedColor

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
        fontSize: Width * .03
    },
    FirstCategoryHeader: {
        fontFamily: FontFamilies.Etisalat_0,
        fontSize: FontSize.LargFontSize,
        color: 'gray',
        textAlign: 'left',
        width: Width * .9,
    },
})
export { AddBudget } 