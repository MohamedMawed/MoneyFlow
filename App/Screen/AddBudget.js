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
            {this.state.AddBudget && <View style={{ width: '100%', alignItems: 'center' }}>
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
                        <TouchableOpacity style={{marginHorizontal:Width*.01}} onPress={()=>{
                            this.setState({AddBudget:false})
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
                            fontSize: FontSize.LargFontSize,marginHorizontal:Width*.03
                            // marginHorizontal: Width * .04
                        }]}> {strings('newBudget')}</Text>

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
                        <Text style={[Styles.TextStyle, { fontSize: 18 }]}>{strings('budget')}</Text>
                        <Text style={[Styles.TextStyle, { color: '#7274CD', fontSize: Width * .08 }]}>{this.state.valueSlider}</Text>
                    </View>

                    {/* //slider */}
                    <View style={{ width: '100%', height: '30%', alignItems: 'center' }}>

                        <MultiSlider
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
                                console.log(values, "ssssssssssssssddd")
                                this.setState({ valueSlider: values[0] })
                            }}
                        //    onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                        />


                    </View>
                    <View style={{ width: '90%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>
                    <DropDown
                    defaultIndex={0}
                    onSelect={(index) => {
              
                    }}
                    defaultValue={'weekly'}
                    Data={[{ text: 'weekly', Icon:'' }, { text: 'Monthly', Icon: '' }, { text: 'annual', Icon: '' }]}
                    Width={Width * .85}
                    DropdownWidth={Width * .85} />
                    
                        {/* <TouchableOpacity onPress={() => {
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

                        </TouchableOpacity> */}


                    </View>


                </View>

                {/* // TITLE CHOOSE ICON */}
                <View style={[Styles.Header, { width: '90%', height: Height * .05, marginTop: Height * .03 }]}>
                    <Text style={[Styles.TextStyle, { fontSize: Width * .03 }]}>{strings('chooseCat')}</Text>
                </View>


                <View style={[Styles.Header, { width: '100%', height: Height * .48, marginVertical: 5 }]}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        numColumns={4}
                        contentContainerStyle={{ width: '100%', justifyContent: 'space-between' }} data={Requires.ICons} renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: '25%', alignItems: 'center', marginBottom: Height * .01, justifyContent: 'center' }}>

                                    <TouchableOpacity onPress={() => { this.setState({ CurantSelected: index, icon: item.icon, category: item.text }) }} activeOpacity={.8} style={{ width: Width * .1, height: Width * .15, alignItems: 'center', justifyContent: 'space-between', marginVertical: Height * .015, elevation: CurantSelected == index ? 0 : 5 }}>
                                        <View style={{ width: Width * .14, height: Width * .14, backgroundColor: CurantSelected == index ? Colors.AppBlueColor : Colors.WhiteColor, borderRadius: Width * .02, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={item.icon} resizeMode='contain' style={{ width: '60%', height: '60%', tintColor: CurantSelected == index ? Colors.WhiteColor : Colors.DarkGrayColor }} />
                                        </View>
                                        <Text style={[Styles.TextStyle, { fontSize: Width * .03, marginTop: Height * .001, color: CurantSelected == index ? Colors.AppBlueColor : Colors.DarkGrayColor }]}>{item.text}</Text>
                                    </TouchableOpacity>


                                </View>
                            )
                        }} />
                </View>
            </View>}
            {this.state.AddBudget == false && <View style={{ width: '100%', height: '100%' }}>
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
            </View>}

       


        
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
            />
                 <TouchableOpacity onPress={async () => {
                let { startDate, endDate, valueSlider, AddBudget, icon, category } = this.state
                if (AddBudget) {
                    if (valueSlider == 0)
                        return alert('Please specify the value')
                    if (startDate == 'Start date')
                        return alert('Please specify the Start date')
                    if (endDate == 'End date')
                        return alert('Please specify the End date')
                    if (icon == '')
                        return alert('Please selected icon')
                    // add store
                    setSavedMonthlyExpenses(getSavedMonthlyExpenses()+valueSlider)
                    let newBudget = { icon: icon, startDate: startDate, endDate: endDate, nameCategory: category, Budget: valueSlider }
                    let Budget = await AsyncStorage.getItem('Budget' + _key)
                    if (Budget) {
                        let currantBudget = JSON.parse(Budget)
                        currantBudget.push(newBudget)
                        AsyncStorage.setItem('Budget' + _key, JSON.stringify(currantBudget))
                        this.setState({ BudgetList: currantBudget })
                        console.log('currantBudget', currantBudget)
                    }
                    else {
                        AsyncStorage.setItem('Budget' + _key, JSON.stringify([newBudget]))
                        this.setState({ BudgetList: [newBudget] })
                    }

                    Alert.alert('successfully', 'Budget Added successfully', [{
                        text: 'ok', onPress: () => {
                            this.setState({ AddBudget: false })
                        }
                    }])

                }
                else {
                    this.setState({ AddBudget: true })
                }


                // ios-save
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
export { AddBudget } 