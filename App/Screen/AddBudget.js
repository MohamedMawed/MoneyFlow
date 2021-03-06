import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import { Height, Width } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import { Requires, iconsBudgetList } from '../Assets/Requires';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { FontFamilies, FontSize } from '../Global/Font';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { getSavedMonthlyIncome, _key, getSavedMonthlyExpenses, setSavedMonthlyExpenses } from '../Global/API';
import { strings, isArabic, getAppLanguage } from '../locals';
import DropDown from '../Components/DropDown';
import { PlansGoalsList2 } from '../Global/ComponentTest';
import { FixViewsOrder } from '../Global';
import { connect } from 'react-redux';
import { AppReducer } from '../state/reducer';
import Dropdown2 from '../Components/Dropdown2';
const createBudget = AppReducer.createBudget;
class AddBudget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CurantSelected: -1,
            sliderOneValue: [10000],
            valueSlider: 0,
            AddBudget: false,
            PlansGoalsList: PlansGoalsList2,
            isDateTimePickerVisible: false,
            startDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
            endDate: strings('endDate'),
            ButtonType: -1,
            icon: -1,
            category: '',
            BudgetList:iconsBudgetList(),
            IsLoding: true,
            payment_period: 0
        }
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        let _date = new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate()
        this.setState({ startDate: _date })
        this._hideDateTimePicker();
    };
    render() {

        //   <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={Styles.Container}>
        // </LinearGradient>
        console.log("TAG","IncomeCategoryData",this.props.IncomeCategoryData)
        let { CurantSelected, BudgetList, IsLoding } = this.state
        let text = ['food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food',]
        return (<View style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: '#fff',
        }}>
            {/* //header */}
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={[Styles.Header, {
                    width: '100%',
                    height: Height * .08,
                    backgroundColor: Colors.WhiteColor,
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }]}>
                    <View style={{
                        width: '50%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity style={{ marginHorizontal: Width * .01 }} onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <View style={{ transform: [{ rotate: isArabic() ? '180deg' : '0deg' }] }}>

                                <Image
                                    source={Requires.back}
                                    resizeMode='contain'
                                    style={{
                                        width: Width * .05,
                                        height: Width * .05
                                    }} />
                            </View>
                        </TouchableOpacity >
                        <Text style={[Styles.TextStyle, {
                            width: '90%',
                            textAlign: 'left',
                            fontSize: FontSize.LargFontSize, marginHorizontal: Width * .03,fontFamily:FontFamilies.Etisalat_0
                            // marginHorizontal: Width * .04
                        }]}> {strings('newBudget')}</Text>

                    </View>
                    <View style={{ width: '25%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    </View>
                </View>
                {/* // form enter data */}
                <View style={[Styles.Header, { width: '95%', height: Height * .22, backgroundColor: Colors.WhiteColor, elevation: 7, borderRadius: Width * .03, alignItems: 'center', justifyContent: 'center' }]}>

                    {/* <View style={{ width: '90%', height: Height * .06, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={[Styles.TextStyle, { fontSize: 18 }]}>{strings('budget')}</Text>
                        <Text style={[Styles.TextStyle, { color: '#7274CD', fontSize: 15 }]}>{this.state.valueSlider}</Text>
                    </View> */}

                    {/* //slider */}
                    <View style={{ width: '100%', height: Height * .06, alignItems: 'center' }}>
                        {/* //inputs */}
                        <View style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-evenly'
                        }}>
                            <TextInput
                                keyboardType='numeric'
                                autoCorrect={false}
                                onChangeText={(text) => {
                                    this.setState({ valueSlider: text })
                                }}
                                placeholder={strings('howMuch')}
                                style={{
                                    fontSize: Width * .03,
                                    fontFamily: FontFamilies.Etisalat_0,
                                    width: '90%',
                                    textAlign: 'left',
                                    height: Height * .06,
                                    textAlign : getAppLanguage() == 'ar'?'right':'left',
                                    borderRadius: Width * .02,
                                    borderWidth: 1,
                                    borderColor: '#D9D9D9',
                                    // fontSize: 12,
                                    backgroundColor: '#F9F9F9',
                                    paddingHorizontal: Width * .03,
                                    // marginTop: Height * .022
                                }} />

                            {/* <MultiSlider
                                values={[this.state.valueSlider]}
                                sliderLength={Width * .8}
                                min={0}
                                step={1}
                                max={this.state.sliderOneValue}
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
                                    //console.log(values, "ssssssssssssssddd")
                                    this.setState({ valueSlider: values[0] })
                                }}
                            //    onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                            /> */}

                        </View>


                    </View>
                    <View style={{ width: '95%', height: Height * .04, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: FixViewsOrder(), width: '50%' }}>
                            {/* <Text style={[Styles.TextStyle, { color: '#7274CD', fontSize: 15 }]}>{Math.floor((this.state.valueSlider / this.state.sliderOneValue * 100) * 10) / 10}%</Text>
                            <Text style={[Styles.TextStyle, { color: Colors.DarkGrayColor, fontSize: 15 }]}>{this.state.sliderOneValue}</Text> */}
                        </View>

                    </View>

                    <View style={{ width: Width * .85, height: Height * .06, alignItems: 'center', justifyContent: 'space-between', flexDirection: FixViewsOrder() }}>
                        <View style={{ width: '43%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>

                            <Dropdown2
                                returnIndex
                                defaultIndex={0}
                                onSelect={(index) => {
                                    this.setState({ payment_period: index })
                                }}
                                defaultValue={strings('weekly')}
                                Data={[{ text: strings('weekly'), Icon: '' }, { text: strings('Monthly'), Icon: '' }, { text: strings('annual'), Icon: '' }]}
                                Width={Width * .41}
                                borderRadius={Width * .05}
                                dropdownHeight={Height * .06}
                                DropdownWidth={Width * .41} />
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.setState({ ButtonType: 'end' })
                            this._showDateTimePicker()
                        }}
                            activeOpacity={.5}
                            style={{
                                width: Width * .41,
                                height: Height * .06,
                                borderRadius: Width * .02,
                                borderColor: '#D7D7D7',
                                borderWidth: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#F9F9F9',
                                paddingHorizontal: Width * .03
                            }}>
                            <Image source={Requires.claender} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                            <View style={{ width: 1, height: '100%', backgroundColor: '#D7D7D7' }} />
                            <Text
                                style={[Styles.TextStyle, {
                                    width: '60%', fontSize: Width * .03,textAlign:'left',
                                    color: '#D7D7D7',fontFamily:FontFamilies.Etisalat_0
                                }]}>{this.state.startDate}</Text>

                        </TouchableOpacity>
                    </View>
                </View>

                {/* // TITLE CHOOSE ICON */}
                <View style={[Styles.Header, { width: '90%', height: Height * .05, marginTop: Height * .03 }]}>
                    <Text style={[Styles.TextStyle, { fontSize: Width * .03 ,fontFamily:FontFamilies.Etisalat_0}]}>{strings('chooseCat')}</Text>
                </View>


                <View style={[Styles.Header, { width: '100%', height: Height * .44, marginVertical: 5 }]}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        numColumns={4}
                        contentContainerStyle={{ width: '100%', justifyContent: 'space-between' }}
                         data={this.props.IncomeCategoryData[1]}
                         renderItem={({ item, index }) => {
                             
                            return (
                                <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => { this.setState({ CurantSelected: index, icon: index, category: item.text }) }} activeOpacity={.8} style={{  height: Width * .2, alignItems: 'center', justifyContent: 'space-between', marginVertical: Height * .015, elevation: CurantSelected == index ? 0 : 5 }}>
                                        <View style={{ width: Width * .14, height: Width * .14, backgroundColor: CurantSelected == index ? Colors.AppBlueColor : Colors.WhiteColor, borderRadius: Width * .02, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={item.icon} resizeMode='contain' style={{ width:'60%', height:'60%', tintColor: CurantSelected == index ? Colors.WhiteColor : Colors.DarkGrayColor }} />
                                        </View>
                                        <Text style={[Styles.TextStyle, { fontSize: Width * .03, marginTop: Height * .001,width:Width*.23,textAlign:'center',fontFamily:FontFamilies.Etisalat_0, color: CurantSelected == index ? Colors.AppBlueColor : Colors.DarkGrayColor }]}>{item.notranslate?item.text:strings(item.text)}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }} />
                </View>
            </View>


            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
            />
            <TouchableOpacity onPress={async () => {
                this.OnSubmit()
                // ios-save
            }} style={{ elevation: 5, width: Width * .9, backgroundColor: Colors.AppBlueColor, height: Height * .07, borderRadius: Width * .09, alignItems: 'center', justifyContent: 'center', marginTop: Height * .03,position:'absolute',bottom:Height*.05 }}>
                <Text style={{ fontSize: 17, color: Colors.WhiteColor, fontFamily: FontFamilies.Etisalat_0 }}>{strings('save')}</Text>
            </TouchableOpacity>
        </View>
        )

    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    OnSubmit = async () => {

        let { startDate, endDate, valueSlider, AddBudget, icon, category, payment_period } = this.state
        if (valueSlider == 0)
        return  Alert.alert('',strings('PleaseSpecifyTheValue'),[{text:strings('ok')}])
        if (startDate == 'Start date')
        return  Alert.alert('',strings('PleaseSpecifyTheDate'),[{text:strings('ok')}])
        if (icon == -1)
        return  Alert.alert('',strings('PleaseSelectedIcon'),[{text:strings('ok')}])

        let newBudget = { icon_index: icon, start_date: startDate, category: category, money: valueSlider, payment_period: payment_period }
        //console.log("newBudgetnewBudget", newBudget)
        this.props.createBudget(newBudget)
        // if (Budget) {
        //     let currantBudget = JSON.parse(Budget)
        //     currantBudget.push(newBudget)
        //     AsyncStorage.setItem('Budget' + _key, JSON.stringify(currantBudget))
        //     this.setState({ BudgetList: currantBudget })
        //     //console.log('currantBudget', currantBudget)
        // }
        // else {
        //     AsyncStorage.setItem('Budget' + _key, JSON.stringify([newBudget]))
        //     this.setState({ BudgetList: [newBudget] })
        // }


        this.props.navigation.goBack()





    }
    CalcPercent = (start, end) => {
        let _staer = start.split('-')[2] + '-' + start.split('-')[1] + '-' + start.split('-')[0]
        let _end = end.split('-')[2] + '-' + end.split('-')[1] + '-' + end.split('-')[0]
        let totdays = Math.abs(new Date(_end) - new Date(_staer));
        //console.log(totdays, _staer, _end, "dddddddddddddddddsssss")
        // //console.log(melli)
        totdays = totdays / 1000 / 60 / 60 / 24
        let tillNow = Math.abs(new Date() - new Date(_staer));
        tillNow = tillNow / 1000 / 60 / 60 / 24
        return parseInt((tillNow / totdays) * 100)
    }
    CalcPercentColor = (start, end) => {
        let percent = this.CalcPercent(start, end)
        if (percent <= 33) return Colors.AppGreenColor
        if (percent <= 66) return Colors.AppBlueColor
        if (percent <= 100) return Colors.AppRedColor
    }
    async componentDidMount() {
        this.setState({ IsLoding: false })
        let Budget = await AsyncStorage.getItem('Budget' + _key)
        if (Budget) {
            this.setState({ BudgetList: JSON.parse(Budget), IsLoding: true })
        } else {
            this.setState({ IsLoding: true })
        }
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


function mapStateToProps(state) {
    return {
        income: state.appReducer.income,
        IncomeCategoryData: state.appReducer.IncomeCategoryData,  
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createBudget: (value) => dispatch(createBudget(value)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddBudget)