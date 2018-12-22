import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar, FlatList, TouchableOpacity, TextInput, ScrollView,ActivityIndicator,Alert } from 'react-native'
import { Height, Width } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import { Requires } from '../Assets/Requires';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Lang, FixViewsOrder } from '../Global/Localization';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FontFamilies, FontSize } from '../Global/Font';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { HomeProgressBarItem } from '../Components/HomeProgressBarItem';
import { PlansGoalsList } from '../Global/ComponentTest';
import { _key } from '../Global/API';
import { connect } from 'react-redux';

import { strings } from '../locals';
class PlanList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CurantSelected: -1,
            valueSlider: 0,
            NamePlan: '',
            AmountValue: '',
            addPlan: false,
            PlansGoalsList: PlansGoalsList,
            isDateTimePickerVisible: false,
            startDate: strings('startDate'),
            endDate: strings('endDate'),
            ButtonType: -1,
            target:500,
            icon:'',
            PlanList:[],
            IsLoding:true

        }
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {

        let  _date=new Date(date).getDate()+'-'+new Date(date).getMonth()+'-'+new Date(date).getFullYear()
        if (this.state.ButtonType == 'start')
            this.setState({ startDate: _date })
        if (this.state.ButtonType == 'end')
            this.setState({ endDate: _date })
        console.log(date, "datedatedatedatedatedate")
        this._hideDateTimePicker();
    };
    render() {
        console.log(this.props.goals,"this.props.goals")
        let { CurantSelected, PlanList, IsLoding,addPlan } = this.state
        return (<View style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            alignItems: 'center'
        }}>


            {/* //header */}
                <View style={{ width: '100%', height: '95%' }}>
                <View style={{  height: '100%', alignItems: 'center' }}>

                    <View style={{ width: '90%',height:Height*.08,justifyContent:'center' }}>
                        <Text style={Styles.FirstCategoryHeader}>{strings('plans')}</Text>
                    </View>
                     {/* // swiper */}
                    {/* // _________________________________________________________ */}
                    <View style={{width:Width,alignItems:'center',height:Height*.75}}>

                    <ScrollView
                        contentContainerStyle={{
                            width: Width,
                            // height:Height*.5,
                            // marginBottom: Height * .1,
                            alignItems: 'center',paddingBottom:Height*.06,
                        }}

                    >
                    {/* { icon_index: 7,
        start_date: '11-11-2018',
        end_date: '29-11-2018',
        name: 'dfdfdsf',
        money: '43434',
        category: 'Drink' } */}
                        {IsLoding && this.props.goals.length >= 1 &&this.props.goals.map((item, index) => {
                                console.log(index)
                                // let newPlan = { icon: icon, startDate: startDate, endDate: endDate, NamePlan: NamePlan,target:target }

                                return (
                                    <HomeProgressBarItem
                                    onClick={() => this.props.navigation.navigate('plan',{item: item,index:index})}
                                    key={index}
                                        cost={item.money}
                                        Percent={this.CalcPercent(item.start_date, item.end_date)}
                                        BackColor={this.CalcPercentColor(item.start_date, item.end_date)}
                                        Source={Requires.ICons[item.icon_index].icon}
                                        nameCategory={item.name}
                                        />
                                )
                            })
                            }
                             {IsLoding == false && <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size='large' />
                            </View>}
                            {IsLoding && PlanList.length < 1 && <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>{strings('noPlans')}</Text>
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
            
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Add_plan')

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

        // console.log(melli)
        totdays = totdays / 1000 / 60 / 60 / 24
        console.log(totdays, "dddddddddddddddddsssss")

        let tillNow = Math.abs(new Date() - new Date(_staer));
        tillNow = tillNow / 1000 / 60 / 60 / 24
        return parseInt((tillNow / totdays) * 100)
    }
    CalcPercentColor = (start, end) => {

        let percent = this.CalcPercent(start, end)
        console.log(percent)
        if (percent <= 33) return Colors.AppGreenColor
        if (percent <= 66) return Colors.AppBlueColor
        if (percent <= 100) return Colors.AppRedColor

    }
    async componentDidMount() {
        this.setState({ IsLoding: false })
        let Plan = await AsyncStorage.getItem('Plan' + _key)
        if (Plan) {
            this.setState({ PlanList: JSON.parse(Plan), IsLoding: true })
        } else {
            this.setState({ IsLoding: true })
        }
    }
   async onsubmitPlan(){

        // CurantSelected: -1,
        // valueSlider: 0,
        // NamePlan: '',
        // AmountValue: '',
        // addPlan: false,
        // PlansGoalsList: PlansGoalsList,
        // isDateTimePickerVisible: false,
        // startDate: 'Start date',
        // endDate: 'End date',
        // ButtonType: -1

        let { startDate, endDate, valueSlider, addPlan, icon, category,target,NamePlan } = this.state
        if (addPlan) {
            
            if (NamePlan == '')
            return alert('Please specify the name')
            if (target == 0)
                return alert('Please specify the value')
            if (startDate == 'Start date')
                return alert('Please specify the Start date')
            if (endDate == 'End date')
                return alert('Please specify the End date')
            if (icon == '')
                return alert('Please selected icon')
            // add store
            let newPlan = { icon: icon, startDate: startDate, endDate: endDate, NamePlan: NamePlan,target:target }
            let Plan = await AsyncStorage.getItem('Plan' + _key)
            if (Plan) {
                let currantPlan = JSON.parse(Plan)
                currantPlan.push(newPlan)
                AsyncStorage.setItem('Plan' + _key, JSON.stringify(currantPlan))
                this.setState({ PlanList: currantPlan })
                console.log('currantPlan', currantPlan)
            }
            else {
                AsyncStorage.setItem('Plan' + _key, JSON.stringify([newPlan]))
                this.setState({ PlanList: [newPlan] })
            }
                    this.setState({ AddPlan: false })

        }
        else {
            this.setState({ AddPlan: true })
        }
    }
}
function mapStateToProps(state) {
    // console.log("TAG", "previous profile", state)
   
    return {
      goals: state.appReducer.goal,
    //   onBoardingDataLoaded: state.userReducer.onBoardingDataLoaded,
    }
  }

const Styles = StyleSheet.create({
    Container: {
        width: Width,
        height: Height,
        backgroundColor: Colors.WhiteColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Header: {

    },
    TextStyle: {
        fontFamily: FontFamilies.Etisalat_0,
        color: Colors.BlackColor,
        fontSize: Width*.03,
        // width:'100%',
        textAlign: 'left'
    },
    FirstCategoryHeader: {
        fontFamily: FontFamilies.Etisalat_0,
        fontSize: FontSize.LargFontSize,
        color: 'gray',
        textAlign: 'left',
        width: Width * .9,
    },
})

export default connect(
    mapStateToProps
  )(PlanList)