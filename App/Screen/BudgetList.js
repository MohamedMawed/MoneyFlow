import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar, FlatList, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
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
import { getSavedMonthlyIncome, _key, getSavedMonthlyExpenses, setSavedMonthlyExpenses } from '../Global/API';
import { strings } from '../locals';
import DropDown from '../Components/DropDown';

class BudgetList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CurantSelected: -1,
            sliderOneValue: [10000],
            valueSlider: 0,
            AddBudget: false,
            PlansGoalsList: PlansGoalsList2,
            isDateTimePickerVisible: false,
            startDate: strings('startDate'),
            endDate: strings('endDate'),
            ButtonType: -1,
            icon: '',
            category: '',
            BudgetList: [],
            IsLoding: true
        }
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {

        let _date = new Date(date).getDate() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getFullYear()
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
        let { CurantSelected, BudgetList, IsLoding } = this.state
        let text = ['food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food',]
        return (<View style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            backgroundColor: '#fff',
        }}>
            {/* //header */}
               <View style={{ width: '100%', height: '100%' }}>
                <View style={{ height: '95%', alignItems: 'center' }}>

                    <View style={{ width: '90%', height: Height * .08, justifyContent: 'center' }}>
                        <Text style={Styles.FirstCategoryHeader}>{strings('budgets')}</Text>
                    </View>
                    {/* // swiper */}
                    <View style={{ width: '100%', height: Height * .1, alignItems: 'center', justifyContent: 'center' }}>
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

                            >Nov 2018</Text>
                            <Image source={Requires.arrow_right} style={{
                                width: Width * .03,
                                tintColor: 'red',
                                resizeMode: 'contain'
                            }} />
                        </View>
                    </View>
                    {/* // _________________________________________________________ */}
                    <View style={{width:Width,alignItems:'center',height:Height*.75}}>
                    <ScrollView
                        contentContainerStyle={{
                            width: Width,
                            // height:Height*.5,
                            // marginBottom: Height * .1,
                          alignItems: 'center',paddingBottom:Height*.06
                        }}

                    >

                            {IsLoding && BudgetList.length >= 1 && this.state.BudgetList.map((item, index) => {
                                console.log(index)
                                return (
                                    <HomeProgressBarItem
                                        onClick={() => this.props.navigation.navigate('plan', { item: item, dayes: this.CalcPercent(item.startDate, item.endDate) })}
                                        key={index}
                                        nameCategory={item.nameCategory}
                                        cost={item.Budget}
                                        Percent={this.CalcPercent(item.startDate, item.endDate)}
                                        BackColor={this.CalcPercentColor(item.startDate, item.endDate)}
                                        Source={item.icon} />
                                )
                            })
                            }
                            {IsLoding == false && <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size='large' />
                            </View>}
                            {IsLoding && BudgetList.length < 1 && <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>{strings('noBudgets')}</Text>
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
            <Image resizeMode='contain' style={{width:Width*.13,height:Width*.13}}  source={Requires.Plus}/>
                {/* <Ionicons name={this.state.addPlan ? 'md-checkmark-circle' : 'md-add-circle'} size={Width * .14} color={'#F9616F'} /> */}
            </TouchableOpacity>
        </View>
        )
    }
    CalcPercent = (start, end) => {

        let _staer = start.split('-')[2] + '-' + start.split('-')[1] + '-' + start.split('-')[0]
        let _end = end.split('-')[2] + '-' + end.split('-')[1] + '-' + end.split('-')[0]
        let totdays = Math.abs(new Date(_end) - new Date(_staer));
        console.log(totdays, _staer, _end, "dddddddddddddddddsssss")

        // console.log(melli)
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


export { BudgetList } 