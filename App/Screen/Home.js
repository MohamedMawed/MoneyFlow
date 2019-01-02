import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet, TouchableOpacity, Image
} from 'react-native'
import { BarChart, LineChart,AreaChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'

import { CustomTextInput } from '../Components/TextInput';
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import { Colors } from '../Global/Colors';
import HomeMonthsSwiperComponent from '../Components/HomeMonthsSwiperComponent';
import { HomeMoneyItem } from '../Components/HomeMoneyItem';
import { setHomeScreen } from '../Global/API';
import { strings } from '../locals';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            PlansGoalsList: [
                {
                    Icon: Requires.Home,
                    startDate: '2018/01/01',
                    endDate: '2020/02/01',
                    cost: 234
                },
                {
                    Icon: Requires.Home,
                    startDate: '2018/07/010',
                    endDate: '2020/02/01',
                    cost: 3700
                },
            ],
            stateChanger: 0
        }
    }
    componentDidMount() {
        // setHomeScreen(this);
        firebase.database().ref('/' + firebase.auth().currentUser.uid).set(this.props.appData, (res) => {
            //console.log('app backup result',res);
        })
    }
    CalcPercent = (start, end) => {
        // //console.log((new Date()).days-10)
        let totdays = Math.abs(new Date(end) - new Date(start));
        // //console.log(melli)
        totdays = totdays / 1000 / 60 / 60 / 24
        let tillNow = Math.abs(new Date() - new Date(start));
        tillNow = tillNow / 1000 / 60 / 60 / 24
        //console.log('totdays', totdays)
        //console.log('tillNow', tillNow)
        //console.log('Percent', (tillNow / totdays) * 100)
        return (tillNow / totdays) * 100
    }
    CalcPercentColor = (start, end) => {

        let percent = this.CalcPercent(start, end)
        //console.log(percent)
        if (percent <= 33) return Colors.AppGreenColor
        if (percent <= 66) return Colors.AppBlueColor
        if (percent <= 100) return Colors.AppRedColor

    }
    getChartData = () => {
        let { goal, budget } = this.props;
        //console.log('goalllsss',goal);
        let date1 = new Date();
        date1 = date1.toString();
        date1 = date1.split(' ')[3];
        let res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 1; i <= 12; i++) {
            let plan_cost = 0;
            let first_day = i + '/1/' + (new Date()).toString().split(' ')[3];
            console.log('first_day', first_day);
            goal.forEach(element => {
                // let elementDate = element.start_date; // MM/DD/YYYY;
                // //console.log('element.start_date',new Date(element.start_date));
                // //console.log('element.end_date',new Date(element.end_date));
                if (
                    (new Date(first_day)) - (new Date(element.end_date)) < 0 &&
                    (new Date(first_day)) - (new Date(element.start_date)) > 0
                ) {
                    console.log('first_day', first_day, i, 'entered', element);
                    //console.log('element.start_date',new Date(element.start_date));
                    if (element.payment_period == 0)
                        plan_cost += (((element.money - element.start_money) / ((new Date(element.end_date) - (new Date(element.start_date)))/ 1000 / 60 / 60 / 24 / 30) / 4) * 3);
                    else if (element.payment_period == 1) {
                        plan_cost += ((element.money - element.start_money) / ((new Date(element.end_date) - (new Date(element.start_date)))/ 1000 / 60 / 60 / 24 / 30));
                    }
                }

            });

            budget.forEach(element => {
                //console.log('budgetElement',element)
                //console.log('element.start_date',new Date(element.start_date));
                //console.log('element.end_date',new Date(element.end_date));

                if ((new Date(first_day)) - (new Date(element.start_date)) > 0) {
                    console.log('first_day', first_day, i, 'enteredBudget', element);
                    if (element.payment_period == 0)
                        plan_cost += element.money * 4;
                    else if (element.payment_period == 1) {
                        plan_cost += element.money;
                    }
                }
            });
            console.log('plan_cost',plan_cost);


            res[i - 1] = Math.round(plan_cost*100)/100;
        }

        console.log('current statistics',res);
        return res;
        return [12, 12, 3, 2, 1, 22];
    }
    render() {
        const fill = 'rgb(134, 65, 244)'
        const contentInset = { top: 20, bottom: 20 }
        const data = this.getChartData()
        const x = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
        return (
            <View style={styles.container}>
                <HomeMonthsSwiperComponent
                    handleMonthChange={(NewKey) => {
                        //console.log(NewKey)
                    }}
                />
                <View style={styles.categoriesContainer}>
                    <HomeMoneyItem
                        Source={Requires.arrow_down}
                        color={Colors.AppBlueColor}
                        value={this.props.income}
                        Title={strings('Income')} />
                    <HomeMoneyItem
                        Source={Requires.arrow_up}
                        color={Colors.AppRedColor}
                        value={this.props.expense}
                        Title={strings('Expenses')} />
                </View>
                <View style={{ marginTop: Height * .04, marginHorizontal: Width * .02, height: '50%', width: Width * .94 }}>

                    <Text style={{
                        color: Colors.BlackColor,
                        fontSize: 22,
                        fontFamily: FontFamilies.Etisalat_0
                    }}>
                        {strings('monthlyReport')}

                    </Text>
                    <View style={{ height: Height * .35, flexDirection: 'row' }}>
                        <YAxis
                            data={data}
                            contentInset={contentInset}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            numberOfTicks={10}
                            formatLabel={value => value}
                        />
                        <AreaChart
                            style={{ flex: 1 }}
                            data={data}
                            xScale={scale.scaleTime}
                            contentInset={{ top: 10, bottom: 10 }}
                            svg={{ fill: Colors.greenlite,fillOpacity:.7 }}
                            curve={shape.curveLinear}
                        >
                            <Grid />
                        </AreaChart>
                    </View>
                    <XAxis
                        data={x}
                        svg={{
                            fill: 'black',
                            fontSize: 10,
                            fontWeight: 'bold',
                            rotation: 20,
                            originY: 30,
                            y: 5,
                        }}
                        // xAccessor={({ item }) => item}
                        scale={scale.scaleTime}
                        style={{ marginHorizontal: -15, height: 20,marginLeft:20 }}
                        contentInset={{ left: 10, right: 25 }}
                        formatLabel={(value,index) => x[index]}
                    />

                </View>
                <TouchableOpacity onPress={() => {

                    this.props.navigation.navigate('AddIncome')

                    // ios-save
                }} style={{ position: 'absolute', elevation: 7, bottom: Height * .15, right: Width * .075 }}>
                    <Image resizeMode='contain' style={{ width: Width * .13, height: Width * .13 }} source={Requires.Plus} />
                    {/* <Ionicons name={this.state.addPlan ? 'md-checkmark-circle' : 'md-add-circle'} size={Width * .14} color={'#F9616F'} /> */}
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    categoriesContainer: {
        width: Width * .94,
        height: Height * .11,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Height * .03
    },
    container: {
        width: Width,
        height: Height,
        alignItems: 'center',
        backgroundColor: 'white',
        // justifyContent: 'space-around'
    },
    FirstCategoryHeader: {
        fontFamily: FontFamilies.Etisalat_0,
        fontSize: FontSize.LargFontSize,
        color: 'gray',
        textAlign: 'left',
        width: Width * .9,
    },
    SecondCategoryHeader: {
        fontFamily: FontFamilies.Etisalat_0,
        fontSize: FontSize.LargFontSize,
        color: 'gray',
        textAlign: 'left',
        width: Width * .9,
        marginTop: Height * .03,
    },

})


function mapStateToProps(state) {
    console.log("TAG", "previous profile", state)

    return {
        appData: state.appReducer,
        income: state.appReducer.income,
        expense: state.appReducer.expense,
        goal: state.appReducer.goal,
        budget: state.appReducer.budget,
    }
}


export default connect(
    mapStateToProps
)(Home)


