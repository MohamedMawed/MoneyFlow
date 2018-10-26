import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
} from 'react-native'
import { CustomTextInput } from '../Components/TextInput';
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import { Colors } from '../Global/Colors';
import { HomeMonthsSwiperComponent } from '../Components/HomeMonthsSwiperComponent';
import { HomeMoneyItem } from '../Components/HomeMoneyItem';
import { HomeProgressBarItem } from '../Components/HomeProgressBarItem';


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
            ]
        }
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
        return (
            <View style={styles.container}>
                <HomeMonthsSwiperComponent
                    handleMonthChange={(NewKey) => {
                        console.log(NewKey)
                    }}
                />
                <View style={styles.categoriesContainer}>
                    <HomeMoneyItem Source={Requires.arrow_down} color={Colors.AppBlueColor} Title={'Income'} />
                    <HomeMoneyItem Source={Requires.arrow_up} color={Colors.AppRedColor} Title={'Expenses'} />
                </View>
                <View style={{ marginTop: Height * .02,height:'50%', }}>
                    {/* <ScrollView
                        contentContainerStyle={{
                            width: Width,
                            // height:Height*.5,
                            // marginBottom: Height * .1,
                            justifyContent: 'center', alignItems: 'center'
                        }}

                    >
                        <Text style={styles.FirstCategoryHeader}>Plans & Goals</Text>
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
                        <Text style={styles.SecondCategoryHeader}>Budget</Text>
                        <View style={{ marginBottom: Height * .03, }}>
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

                    </ScrollView> */}
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
export { Home }


