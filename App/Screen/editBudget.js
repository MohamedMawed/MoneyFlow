import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar, FlatList, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import { Height, Width } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import { Requires } from '../Assets/Requires';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { FontFamilies, FontSize } from '../Global/Font';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { getSavedMonthlyIncome, _key, getSavedMonthlyExpenses, setSavedMonthlyExpenses } from '../Global/API';
import { strings } from '../locals';
import DropDown from '../Components/DropDown';
import { PlansGoalsList2 } from '../Global/ComponentTest';
import { FixViewsOrder } from '../Global';
import { connect } from 'react-redux';
import { AppReducer } from '../state/reducer';
const editBudget = AppReducer.editBudget;
class EditBudget extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedIndex: props.navigation.state.params.index,
            CurantSelected: props.navigation.state.params.item.icon_index,
            sliderOneValue: [10000],
            valueSlider: props.navigation.state.params.item.money,
            AddBudget: false,
            PlansGoalsList: PlansGoalsList2,
            isDateTimePickerVisible: false,
            startDate: props.navigation.state.params.item.start_date,
            ButtonType: -1,
            icon: props.navigation.state.params.item.icon_index,
            category: props.navigation.state.params.item.category,
            BudgetList: [],
            IsLoding: true,
            payment_period: props.navigation.state.params.item.payment_period,
            Defaultpayment_period: [{ text: 'weekly', Icon: '' }, { text: 'Monthly', Icon: '' }, { text: 'annual', Icon: '' }]
        }
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {

        let _date = new Date(date).getDate() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getFullYear()
        this.setState({ startDate: _date })
        this._hideDateTimePicker();
    };
    render() {
        let { CurantSelected } = this.state
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
                            <Image
                                source={Requires.back}
                                resizeMode='contain'
                                style={{
                                    width: Width * .05,
                                    height: Width * .05
                                }} />
                        </TouchableOpacity >
                        <Text style={[Styles.TextStyle, {
                            width: '90%',
                            textAlign: 'left',
                            fontSize: FontSize.LargFontSize, marginHorizontal: Width * .03
                            // marginHorizontal: Width * .04
                        }]}> {strings('editBudget')}</Text>

                    </View>
                    <View style={{ width: '25%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    </View>
                </View>
                {/* // form enter data */}
                <View style={[Styles.Header, { width: '90%', height: Height * .2, backgroundColor: Colors.WhiteColor, elevation: 7, borderRadius: Width * .03, alignItems: 'center', justifyContent: 'center' }]}>

                    <View style={{ width: '100%', height: '30%', alignItems: 'center' }}>
                        {/* //inputs */}
                        <View style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-evenly'
                        }}>
                            <TextInput
                                value={this.state.valueSlider}
                                keyboardType='numeric'
                                autoCorrect={false}
                                onChangeText={(text) => {
                                    this.setState({ valueSlider: text })
                                }}
                                placeholder='Budget'
                                style={{
                                    fontSize: Width * .03,
                                    fontFamily: FontFamilies.Etisalat_0,
                                    width: '90%',
                                    textAlign: 'left',
                                    height: Height * .06,
                                    borderRadius: Width * .02,
                                    borderWidth: 1,
                                    borderColor: '#D9D9D9',
                                    // fontSize: 12,
                                    backgroundColor: '#F9F9F9',
                                    paddingHorizontal: Width * .03,
                                    // marginTop: Height * .022
                                }} />
                        </View>

                        {/* <MultiSlider
                            values={[this.state.valueSlider]}
                            sliderLength={Width * .8}
                            min={0}
                            step={1}
                            max={getSavedMonthlyIncome()-getSavedMonthlyExpenses()}
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
                    <View style={{ width: '90%', height: Height * .08, alignItems: 'center', justifyContent: 'space-between', flexDirection: FixViewsOrder(), marginTop: Height * .01 }}>
                        <View style={{ width: '43%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>
                            <DropDown
                                returnIndex
                                defaultIndex={this.state.payment_period}
                                onSelect={(index) => {
                                    this.setState({ payment_period: index })
                                }}
                                defaultValue={this.state.Defaultpayment_period[this.state.payment_period].text}
                                Data={this.state.Defaultpayment_period}
                                Width={Width * .38}
                                DropdownWidth={Width * .38} />
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.setState({ ButtonType: 'end' })
                            this._showDateTimePicker()
                        }}
                            activeOpacity={.5}
                            style={{
                                width: '43%',
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
                                    width: '60%', fontSize: Width * .03,
                                    color: '#D7D7D7'
                                }]}>{this.state.startDate}</Text>

                        </TouchableOpacity>
                    </View>
                </View>

                {/* // TITLE CHOOSE ICON */}
                <View style={[Styles.Header, { width: '90%', height: Height * .05, marginTop: Height * .03 }]}>
                    <Text style={[Styles.TextStyle, { fontSize: Width * .03 }]}>{strings('chooseCat')}</Text>
                </View>


                <View style={[Styles.Header, { width: '100%', height: Height * .45, marginVertical: 5 }]}>
                    <FlatList

                        showsVerticalScrollIndicator={false}
                        numColumns={4}
                        contentContainerStyle={{ width: '100%', justifyContent: 'space-between' }} data={Requires.ICons} renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: '25%', alignItems: 'center', marginBottom: Height * .01, justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => { this.setState({ CurantSelected: index, icon: index, category: item.text }) }} activeOpacity={.8} style={{ width: Width * .1, height: Width * .15, alignItems: 'center', justifyContent: 'space-between', marginVertical: Height * .015, elevation: CurantSelected == index ? 0 : 5 }}>
                                        <View style={{ width: Width * .14, height: Width * .14, backgroundColor: CurantSelected == index ? Colors.AppBlueColor : Colors.WhiteColor, borderRadius: Width * .02, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={item.icon} resizeMode='contain' style={{ width: '60%', height: '60%', tintColor: CurantSelected == index ? Colors.WhiteColor : Colors.DarkGrayColor }} />
                                        </View>
                                        <Text style={[Styles.TextStyle, { fontSize: Width * .03, marginTop: Height * .001, color: CurantSelected == index ? Colors.AppBlueColor : Colors.DarkGrayColor }]}>{item.text}</Text>
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
            }} style={{ elevation: 5, width: Width * .9, backgroundColor: Colors.BlueColor, height: Height * .07, borderRadius: Width * .09, alignItems: 'center', justifyContent: 'center', marginTop: Height * .03 }}>
                <Text style={{ fontSize: 15, color: Colors.WhiteColor, fontFamily: FontFamilies.Etisalat_0 }}>Edit</Text>
            </TouchableOpacity>
        </View>
        )

    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    OnSubmit = async () => {
        let { startDate, endDate, valueSlider, AddBudget, icon, category, payment_period } = this.state
        if (valueSlider == 0)
            return alert('Please specify the value')
        if (startDate == 'Start date')
            return alert('Please specify the date')
        if (icon == -1)
            return alert('Please selected icon')
        let newBudget = { icon_index: icon, start_date: startDate, category: category, money: valueSlider, payment_period: payment_period }
        let Budget = this.props.Budgets
        Budget[this.state.selectedIndex] = newBudget
        this.props.editBudget(Budget)
        this.props.navigation.goBack()

    }
    CalcPercent = (start, end) => {
        let _staer = start.split('-')[2] + '-' + start.split('-')[1] + '-' + start.split('-')[0]
        let _end = end.split('-')[2] + '-' + end.split('-')[1] + '-' + end.split('-')[0]
        let totdays = Math.abs(new Date(_end) - new Date(_staer));
        //console.log(totdays,_staer, _end, "dddddddddddddddddsssss")
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
        Budgets: state.appReducer.budget,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editBudget: (value) => dispatch(editBudget(value)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditBudget)