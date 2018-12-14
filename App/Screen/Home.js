import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
} from 'react-native'
import { BarChart, LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'


import { CustomTextInput } from '../Components/TextInput';
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import { Colors } from '../Global/Colors';
import { HomeMonthsSwiperComponent } from '../Components/HomeMonthsSwiperComponent';
import { HomeMoneyItem } from '../Components/HomeMoneyItem';
import { HomeProgressBarItem } from '../Components/HomeProgressBarItem';
import { getSavedMonthlyIncome, setHomeScreen, getSavedMonthlyExpenses } from '../Global/API';
import { strings } from '../locals';
import { connect } from 'react-redux';


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
            stateChanger : 0
        }
    }
    componentDidMount(){
        setHomeScreen(this);
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
    render() {
        const fill = 'rgb(134, 65, 244)'
        const contentInset = { top: 20, bottom: 20 }
        const data = [50, 10, 40, 95, 4, 24, 85, 14, 35, 53, 53, 24, 50, 20, 80]

        return (
            <View style={styles.container}>
                <HomeMonthsSwiperComponent
                    handleMonthChange={(NewKey) => {
                        console.log(NewKey)
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
                      value={getSavedMonthlyExpenses()}
                      Title={strings('Expenses')} />
                </View>
                <View style={{ marginTop: Height * .04, marginHorizontal: Width * .02, height: '50%', width: Width*.94 }}>
                    
                    <Text style={{
                        color: Colors.BlackColor,
                        fontSize: 22,
                        fontFamily:FontFamilies.Etisalat_0
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
                        <BarChart
                        animate={true}
                        animationDuration={1000}
                            style={{ flex: 1, marginLeft: 16 }}
                            data={data}
                            svg={{ fill: Colors.AppBlueColor }}
                            contentInset={contentInset}
                        >
                            <Grid />
                        </BarChart>
                    </View>
                    <XAxis
                        style={{ marginHorizontal: -10 }}
                        data={data}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                    />

                </View>
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
    // FirstCategoryList: {
    //     width: Width,
    //     height: Height * .5,
    //     // backgroundColor: 'red',
    // },

})


function mapStateToProps(state) {
    // console.log("TAG", "previous profile", state)
   
    return {
      income: state.appReducer.income,
    //   onBoardingDataLoaded: state.userReducer.onBoardingDataLoaded,
    }
  }
  
  
  export default connect(
    mapStateToProps
  )(Home)


