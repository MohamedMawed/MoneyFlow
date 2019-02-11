import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage,TextInput, StyleSheet, StatusBar, FlatList, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import { Height, Width } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import { Requires, iconsBudgetList } from '../Assets/Requires';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Lang, FixViewsOrder } from '../Global/Localization';
import { FontFamilies, FontSize } from '../Global/Font';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { HomeProgressBarItem, BudgetItem } from '../Components/HomeProgressBarItem';
import { PlansGoalsList, PlansGoalsList2 } from '../Global/ComponentTest';
import { HomeMonthsSwiperComponent } from '../Components/HomeMonthsSwiperComponent';
import { getSavedMonthlyIncome, _key, getSavedMonthlyExpenses, setSavedMonthlyExpenses } from '../Global/API';
import { strings, getAppLanguage } from '../locals';
import DropDown from '../Components/DropDown';
import { connect } from 'react-redux'
import { AppReducer } from '../state/reducer';
import { CustomeAlert } from '../Components/customAlert';
import Dropdown2 from '../Components/Dropdown2';
const editBudget = AppReducer.editBudget;

class BudgetList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CurantSelected: -1,
            sliderOneValue: [10000],
            valueSlider:"",
            AddBudget: false,
            PlansGoalsList: PlansGoalsList2,
            isDateTimePickerVisible: false,
            startDate: strings('startDate'),
            endDate: strings('endDate'),
            ButtonType: -1,
            icon: -1,
            category: '',
            BudgetList: iconsBudgetList(),
            IsLoding: true,
            Defaultpayment_period: [{ text: strings('weekly'), Icon: '' }, { text: strings('Monthly'), Icon: '' }, { text: strings('annual'), Icon: '' }],
            CurantTab: 1,
            showEditAlert: false,
            selectedIndex:-1,
            IsLoding: true,
            payment_period: 0,

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
        //console.log("thisBudgets", this.props.Budgets)
        //   <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={Styles.Container}>
        // </LinearGradient>
        let { CurantSelected, BudgetList, IsLoding, CurantTab } = this.state
        let text = ['food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food',]
        return (<View style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: '#fff',
        }}>
            {/* //header */}
            <View style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5' }}>
                <View style={{ height: '95%', alignItems: 'center' }}>

                    <View style={{ width: '95%', height: Height * .15, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[Styles.FirstCategoryHeader, { fontFamily: FontFamilies.Etisalat_0, fontSize: 20, color: '#000' }]}>{strings('budgets')}</Text>
                        <Text style={[Styles.FirstCategoryHeader, { marginTop: Height * .01, fontFamily: FontFamilies.Etisalat_0, fontSize: 15, width: '100%', textAlign: 'center' }]}>{strings('titleBudget')}</Text>

                    </View>
                    {/* // swiper */}
                    {/* <View style={{ width: '100%', height: Height * .1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{
                            flexDirection: 'row',
                            borderWidth: 1,
                            borderRadius: Width * .1,e
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

                            >Nov 2018</Text>
                            <Image source={Requires.arrow_right} style={{
                                width: Width * .03,
                                tintColor: 'red',
                                resizeMode: 'contain'
                            }} />
                        </View>
                    </View> */}
                    {/* // _________________________________________________________ */}
                    <View style={{ width: Width, alignItems: 'center', height: Height * .8 }}>
                        <View style={{ height: Height * .08, justifyContent: 'space-between', alignItems: 'center', flexDirection: FixViewsOrder(), width: '95%' }}>
                            <TouchableOpacity onPress={() => {

                                this.setState({ CurantTab: 3,payment_period:2 })
                            }} style={{ width: '30%', height: Height * .06, backgroundColor: CurantTab == 3 ? '#DCDCDC' : '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: Height * .02 }}>
                                <Text style={{ color: Colors.DarkGrayColor, fontSize: 15, paddingHorizontal: Width * .03, fontFamily: FontFamilies.Etisalat_0 }}>{strings('annual')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.setState({ CurantTab: 2,payment_period:1 })
                            }} style={{ width: '30%', height: Height * .06, backgroundColor: CurantTab == 2 ? '#DCDCDC' : '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: Height * .02 }}>
                                <Text style={{ color: Colors.DarkGrayColor, fontSize: 15, paddingHorizontal: Width * .03, fontFamily: FontFamilies.Etisalat_0 }}>{strings('Monthly')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.setState({ CurantTab: 1,payment_period:0 })
                            }} style={{ width: '30%', height: Height * .06, backgroundColor: CurantTab == 1 ? '#DCDCDC' : '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: Height * .02 }}>
                                <Text style={{ color: Colors.DarkGrayColor, fontSize: 15, paddingHorizontal: Width * .03, fontFamily: FontFamilies.Etisalat_0 }}>{strings('weekly')}</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            contentContainerStyle={{
                                width: Width,
                                alignItems: 'center', paddingBottom: Height * .1
                            }} >


                            {IsLoding && this.props.Budgets.length >= 1 && CurantTab == 1 && this.props.Budgets.map((item, index) => { return (this.sections(item, 0, index)) })}
                            {IsLoding && CurantTab == 1 && this.noBudget(this.props.Budgets, 0)}



                            {IsLoding && this.props.Budgets.length >= 1 && CurantTab == 2 && this.props.Budgets.map((item, index) => { return (this.sections(item, 1, index)) })}
                            {IsLoding && CurantTab == 2 && this.noBudget(this.props.Budgets, 1)}


                            {IsLoding && this.props.Budgets.length >= 1 && CurantTab == 3 && this.props.Budgets.map((item, index) => { return (this.sections(item, 2, index)) })}
                            {IsLoding && CurantTab == 3 && this.noBudget(this.props.Budgets, 2)}


                            {IsLoding == false && <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size='large' />
                            </View>}
                            {IsLoding && BudgetList.length < 1 && <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Text>{strings('noBudgets')}</Text> */}

                            </View>}


                        </ScrollView>
                    </View>
                </View>
            </View>
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
            />
            <TouchableOpacity onPress={async () => {
                this.props.navigation.navigate('AddBudget')
            }} style={{ position: 'absolute', elevation: 7, bottom: Height * .05, right: Width * .075 }}>
                <Image resizeMode='contain' style={{ width: Width * .13, height: Width * .13 }} source={Requires.Plus} />
                {/* <Ionicons name={this.state.addPlan ? 'md-checkmark-circle' : 'md-add-circle'} size={Width * .14} color={'#F9616F'} /> */}
            </TouchableOpacity>

            {this.state.showEditAlert&&<CustomeAlert
                CloseAlert={() => { this.setState({ showEditAlert: false }) }}
                AlertWidth={.9}
                AlertHeight={.36}
                AlertPosition='center'
                borderRadius={7}
                AlertOpen={this.state.showEditAlert}>


                <View style={{ height:Height*.06, width: '100%', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                    <Ionicons
                        onPress={() => this.setState({ showEditAlert: false })}
                        name={'md-close-circle'}
                        color={'gray'}
                        size={Width * .06}
                        style={{
                            position: 'absolute',
                            zIndex: 10,
                            top: 0,
                            right: 0,
                            margin: 10
                        }}
                    />
                    <Text style={{
                        width: '100%',
                        textAlign: 'center',
                        fontFamily: FontFamilies.Etisalat_0,
                        fontSize: 16,
                        color: '#000'
                    }}>{strings('editBudget')}</Text>
                </View>


                {/* // form enter data */}
                <View style={[Styles.Header, { width: '100%', height: Height * .2, backgroundColor: Colors.WhiteColor, borderRadius: Width * .03, alignItems: 'center', justifyContent: 'center' }]}>
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
                                    textAlign: getAppLanguage() == 'ar' ? 'right' : 'left',
                                    borderRadius: Width * .02,
                                    borderWidth: 1,
                                    borderColor: '#D9D9D9',
                                    // fontSize: 12,
                                    backgroundColor: '#F9F9F9',
                                    paddingHorizontal: Width * .03,
                                    // marginTop: Height * .022
                                }} />
                        </View>
                    </View>
                    <View style={{ width: '90%', height: Height * .08, alignItems: 'center', justifyContent: 'space-between', flexDirection: FixViewsOrder(), marginTop: Height * .01 }}>
                        <View style={{ width: '50%', height: '30%', justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Dropdown2
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

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
                <TouchableOpacity onPress={async () => {
                    this.OnSubmit()
                    // ios-save
                }} style={{ elevation: 5, width: Width * .5, backgroundColor: Colors.AppBlueColor, height: Height * .07, borderRadius: Width * .09, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 17, color: Colors.WhiteColor, fontFamily: FontFamilies.Etisalat_0 }}>{strings('save')}</Text>
                </TouchableOpacity>



            </CustomeAlert>}



        </View >
        )
    }
    noBudget = (Budgets, index) => {

        let DATA = []
        Budgets.forEach(element => {
            if (element.payment_period == index)
                DATA.push(element)
        });
        let text = strings('noWeeklyBudgets')
        if (index === 0)
            text = strings('noWeeklyBudgets')
        if (index === 1)
            text = strings('noMonthlyBudgets')
        if (index === 2)
            text = strings('noWeeklyAnnual')

        return (
            <View>
                {DATA.length < 1 && <View style={{ width: Width, height: Height * .65, alignItems: 'center', justifyContent: 'center' }}>
                    <Image resizeMode='contain' style={{ width: Width * .3, height: Width * .3 }} source={Requires.budgetIcon} />
                    <Text style={[{ fontFamily: FontFamilies.Etisalat_0, fontSize: 18, color: Colors.DarkGrayColor, marginTop: Height * .03 }]}>{text}</Text>

                </View>}
            </View>
        )
    }
    tabSections = (text) => {
        return (<View style={{ width: '94%', height: Height * .06, backgroundColor: Colors.BlueColor, alignItems: 'flex-start', justifyContent: 'center', borderRadius: 5, marginTop: Height * .02 }}>
            <Text style={{ color: Colors.WhiteColor, fontSize: 15, paddingHorizontal: Width * .03, fontFamily: FontFamilies.Etisalat_0 }}>{text}</Text>
        </View>)
    }
    sections = (item, index, ItemIndex) => {


        return (
            <View >
                {item.payment_period == index ? <BudgetItem
                    onEditBudget={() => {
             this.setState({showEditAlert:true,valueSlider:item.money,CurantSelected:item.icon_index,startDate:item.start_date,category:item.category,payment_period:item.payment_period,index: ItemIndex,icon:item.icon_index,selectedIndex:ItemIndex })

                        // this.props.navigation.navigate('EditBudget', { item: item, index: ItemIndex })
                    }}
                    
                    onRemove={() => {
                        this.OnRemoveBudget(ItemIndex)

                    }}
                    Source={this.state.BudgetList[item.icon_index].icon}
                    cost={item.money}
                    Category={this.state.BudgetList[item.icon_index].text}
                    date={item.start_date}
                    payment_period={item.payment_period}
                /> : null}
            </View>

        )
    }
    OnRemoveBudget(index) {
        let Budgets = this.props.Budgets
        if (Budgets.length == 1)
            Budgets = []
        else
            Budgets.splice(index, 1)
        this.props.editBudget(Budgets)
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



    async componentDidMount() {
        this.setState({ IsLoding: false })
        let Budget = await AsyncStorage.getItem('Budget' + _key)
        if (Budget) {
            this.setState({ BudgetList: JSON.parse(Budget), IsLoding: true })
        } else {
            this.setState({ IsLoding: true })
        }



    }


    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    OnSubmit = async () => {
        let { startDate, endDate, valueSlider, AddBudget, icon, category, payment_period } = this.state
        if (valueSlider == 0)
            return alert('Please specify the value')
        if (startDate == strings('startDate'))
            return alert('Please specify the date')
        if (icon == -1)
            return alert('Please selected icon')
        let newBudget = { icon_index: icon, start_date: startDate, category: category, money: valueSlider, payment_period: payment_period }
        let Budget = this.props.Budgets
    console.log("newBudgetnewBudget",this.state.selectedIndex,newBudget)
        Budget[this.state.selectedIndex] = newBudget
        this.props.editBudget(Budget)
        this.setState({showEditAlert:false,valueSlider:"",startDate: strings('startDate'),selectedIndex:-1})
        // this.props.navigation.goBack()
    }

    CalcPercentColor = (start, end) => {
        let percent = this.CalcPercent(start, end)
        if (percent <= 33) return Colors.AppGreenColor
        if (percent <= 66) return Colors.AppBlueColor
        if (percent <= 100) return Colors.AppRedColor
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
        textAlign: 'center',
    },
})

function mapStateToProps(state) {
    //console.log("stateappReducerbudget", state.appReducer.budget)
    return {
        Budgets: state.appReducer.budget,
        income: state.appReducer.income,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        editBudget: (value) => dispatch(editBudget(value))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(BudgetList)