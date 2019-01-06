import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, ScrollView, FlatList, TouchableOpacity, TextInput,ActivityIndicator,Alert } from 'react-native'
import { Height, Width } from '../Global/Dimension';
import { Colors } from '../Global/Colors';
import { Requires } from '../Assets/Requires';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Lang, FixViewsOrder } from '../Global/Localization';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FontFamilies, FontSize } from '../Global/Font';
import DateTimePicker from 'react-native-modal-datetime-picker';
import  HomeProgressBarItem  from '../Components/HomeProgressBarItem';
import { PlansGoalsList } from '../Global/ComponentTest';
import { _key } from '../Global/API';
import { connect } from 'react-redux';

import { strings } from '../locals';
import { CustomeAlert } from '../Components/customAlert';
import { AppReducer } from '../state/reducer';

const addGoalMoney = AppReducer.addGoalMoney;
const editGoal = AppReducer.editGoal;
class PlanList extends Component {
    constructor(props) {
        super(props)
        this.state = {


            newMoneyAdded : 0,

            
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
            IsLoding:true,
            showAddAlert : false,
            showEditAlert : false,

            selectedGoal : {
                name : '',
                end_date : '',
                target : ''
            }

        }
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {

        let  _date=new Date(date).toISOString().split('T')[0];
            this.setState((prev) => ({
                selectedGoal: {
                    ...prev.selectedGoal,
                    end_date: _date
                }
            })
            )
        this._hideDateTimePicker();
    };
    render() {
        //console.log(this.props.goals,"this.props.goals")
        let {IsLoding} = this.state
        return (<View style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f6f6f6',
            alignItems: 'center'
        }}>


            {/* //header */}
                <View style={{ width: '100%', height: '95%' }}>
                <View style={{  height: '100%', alignItems: 'center' }}>

                    <View style={{ width: '90%',height:Height*.08,justifyContent:'center' }}>
                        <Text style={[Styles.FirstCategoryHeader,{fontFamily: FontFamilies.Etisalat_0}]}>{strings('plans')}</Text>
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
                                //console.log(index)
                                // let newPlan = { icon: icon, startDate: startDate, endDate: endDate, NamePlan: NamePlan,target:target }

                                return (
                                    <HomeProgressBarItem
                                        onClick={() => this.props.navigation.navigate('plan', { item: item, index: index })}
                                        key={index}
                                        index={index}
                                        cost={item.money}
                                        openAddAlert={()=>{
                                            this.setState({
                                                selectedGoalIndex : index,
                                                showAddAlert : true
                                            })
                                        }}
                                        openEditAlert={()=>{
                                            this.setState({
                                                selectedGoalIndex : index,
                                                showEditAlert : true,
                                                selectedGoal : {
                                                    name : item.name,
                                                    end_date : item.end_date,
                                                    target : item.money
                                                }
                                            })
                                        }}
                                        currentlyPaid={item.currently_paid}
                                        remains={Math.round(Math.abs(new Date(item.end_date) - new Date())/ 1000 / 60 / 60 / 24)}
                                        Percent={this.CalcPercent(item.currently_paid,item.money)}
                                        BackColor={this.CalcPercentColor(item.currently_paid,item.money)}
                                        Source={Requires.ICons[item.icon_index].icon}
                                        nameCategory={item.name}
                                        startWith={item.start_money}
                                    />
                                )
                            })
                            }
                             {IsLoding == false && <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size='large' />
                            </View>}
                            {IsLoding && this.props.goals.length < 1 && <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{fontFamily: FontFamilies.Etisalat_0}}>{strings('noPlans')}</Text>
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
            </TouchableOpacity>
            <CustomeAlert
                CloseAlert={() => { this.setState({ showEditAlert: false }) }}
                AlertWidth={.9}
                AlertHeight={.36}
                AlertPosition='center'
                borderRadius={7}
                AlertOpen={this.state.showEditAlert}>
                <View style={{ height: '100%', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    
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
                             }}>{strings('edit_goal_title')}</Text>
                    <TextInput
                        autoCorrect={false}
                        onChangeText={(text) => {
                            this.setState((prev) => ({
                                selectedGoal: {
                                    ...prev.selectedGoal,
                                    name : text
                                }
                            })
                            )
                        }}
                        value={this.state.selectedGoal.name}
                        placeholder={strings('name')}
                        style={{
                            fontSize: Width * .03,
                            fontFamily: FontFamilies.Etisalat_0,
                            width: '90%',
                            height: Height * .06,
                            borderRadius: Width * .02,
                            borderWidth: 1,
                            borderColor: '#D9D9D9',
                            // fontSize: 12,
                            backgroundColor: '#F9F9F9',
                            paddingHorizontal: Width * .03,
                            // marginTop: Height * .022
                        }} />

                        <View style={{
                             height:  Height * .06,
                             flexDirection:'row',
                             width:'90%',
                             justifyContent:'space-between'
                        }}>
                        <TextInput
                        autoCorrect={false}
                        onChangeText={(text) => {
                            this.setState((prev) => ({
                                selectedGoal: {
                                    ...prev.selectedGoal,
                                    target : +text
                                }
                            })
                            )
                        }}
                        keyboardType='numeric'
                        value={this.state.selectedGoal.target+''}
                        placeholder={strings('addPlan_placeHolder_target')}
                        style={{
                            fontSize: Width * .03,
                            fontFamily: FontFamilies.Etisalat_0,
                            width: '45%',
                            height: Height * .06,
                            borderRadius: Width * .02,
                            borderWidth: 1,
                            borderColor: '#D9D9D9',
                            // fontSize: 12,
                            backgroundColor: '#F9F9F9',
                            paddingHorizontal: Width * .03,
                        }} />
                    <TouchableOpacity onPress={() => {
                        this._showDateTimePicker()
                    }} activeOpacity={.5} style={{ width: '50%', height:  Height * .06, borderRadius: Width * .02, borderColor: '#D7D7D7', borderWidth: 1, flexDirection: FixViewsOrder(), justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', paddingHorizontal: Width * .03 }}>

                        <Text style={[Styles.TextStyle, { width: '70%', color: '#D7D7D7', fontSize: Width * .03 }]}>{this.state.selectedGoal.end_date}</Text>
                        <View style={{ width: 1, height: '100%', backgroundColor: '#D7D7D7' }} />
                        <Image source={Requires.claender} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />

                    </TouchableOpacity>
                    </View>


                    <TouchableOpacity onPress={() => {
                        const { name, target, end_date } = this.state.selectedGoal;
                        if (name == '')
                            return global.openToast(strings('addPlan_nameErr'))
                        if (target == 0)
                            return global.openToast(strings('addPlan_targetErr'))
                        if(target < this.props.goals[this.state.selectedGoalIndex].currently_paid)
                        return global.openToast('please choose the target to be more than or equal the currently paid money');

                        if (new Date(end_date) - new Date(this.props.goals[this.state.selectedGoalIndex].start_date) < 0) 
                            return global.openToast('please choose the end date to be greater than or equal the start date');
                        
                        this.props.editGoal(this.state.selectedGoalIndex , name , target , end_date);
                        this.setState({showEditAlert:false})
                        // ios-save 
                    }} style={{ elevation: 5, width: Width * .5, backgroundColor: Colors.BlueColor, height: Height * .07, borderRadius: Width * .09, alignItems: 'center', justifyContent: 'center', marginTop: Height * .01 }}>
                        <Text style={{ fontSize: 15, color: Colors.WhiteColor, fontFamily: FontFamilies.Etisalat_0 }}>{strings('save')}</Text>
                    </TouchableOpacity>
                </View>
            </CustomeAlert>




            <CustomeAlert
                CloseAlert={() => { this.setState({ showAddAlert: false }) }}
                AlertWidth={.9}
                AlertHeight={.28}
                AlertPosition='center'
                borderRadius={7}
                AlertOpen={this.state.showAddAlert}>
                <View style={{ height: '100%', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ showAddAlert: false })
                        }}
                        style={{
                            position: 'absolute',
                            zIndex: 10,
                            top: 0,
                            right: 0,
                            margin: 10
                             }}
                    >
                    <Ionicons
                        name={'md-close-circle'}
                        color={'gray'}
                        size={Width * .06}
                    />
                    </TouchableOpacity>
                    <Text style={{
                        width: '100%',
                        textAlign: 'center',
                        fontFamily: FontFamilies.Etisalat_0,
                        fontSize: 16,
                        color: '#000'
                             }}>{strings('add_money_title')}</Text>

                    <TextInput
                        autoCorrect={false}
                        onChangeText={(text) => {
                            // alert(this.props.goals[this.state.selectedGoalIndex].money - this.props.goals[this.state.selectedGoalIndex].currently_paid)
                            if (+text <= this.props.goals[this.state.selectedGoalIndex].money - this.props.goals[this.state.selectedGoalIndex].currently_paid)
                                {
                                    this.setState({ newMoneyAdded: text })
                                }
                        }}
                        keyboardType={'numeric'}
                        value={this.state.newMoneyAdded}
                        placeholder={strings('addMoneyPopUp_placeHolder')}
                        style={{
                            fontSize: Width * .03,
                            fontFamily: FontFamilies.Etisalat_0,
                            width: '90%',
                            height: Height * .06,
                            borderRadius: Width * .02,
                            borderWidth: 1,
                            borderColor: '#D9D9D9',
                            backgroundColor: '#F9F9F9',
                            paddingHorizontal: Width * .03,
                        }} />
                    <TouchableOpacity onPress={() => {
                        console.log('newMoneyAdded',this.state.newMoneyAdded)
                        if(+this.state.newMoneyAdded !== NaN)
                        this.props.addGoalMoney(this.state.selectedGoalIndex,+this.state.newMoneyAdded);
                        this.setState({newMoneyAdded:'',showAddAlert:false})
                        // ios-save
                    }} style={{ elevation: 5, width: Width * .5, backgroundColor: Colors.BlueColor, height: Height * .07, borderRadius: Width * .09, alignItems: 'center', justifyContent: 'center', marginTop: Height * .01 }}>
                        <Text style={{ fontSize: 15, color: Colors.WhiteColor, fontFamily: FontFamilies.Etisalat_0 }}>{strings('save')}</Text>
                    </TouchableOpacity>
                </View>
            </CustomeAlert>
        </View>
        )
    }
    CalcPercent = (currentlyPaid, total) => {
        return parseInt((currentlyPaid / total) * 100)
    }
    CalcPercentColor = (start, end) => {

        let percent = this.CalcPercent(start, end)
        if (percent <= 33) return Colors.AppGreenColor
        if (percent <= 66) return Colors.AppBlueColor
        if (percent <= 100) return Colors.AppRedColor

    }
}
function mapStateToProps(state) {
    // //console.log("TAG", "previous profile", state)
   
    return {
      goals: state.appReducer.goal,
    //   onBoardingDataLoaded: state.userReducer.onBoardingDataLoaded,
    }
  }

function mapDispatchToProps(dispatch) {
    return {
        addGoalMoney: (index , money) => dispatch(addGoalMoney(index , money)),
        editGoal : (index , name , target , end_date) => dispatch(editGoal(index , name , target , end_date)),
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
    mapStateToProps,mapDispatchToProps
  )(PlanList)