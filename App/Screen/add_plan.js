import React, { Component } from 'React'
import { Text, Image, View, AsyncStorage, StyleSheet, StatusBar, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
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
class add_plan extends Component {
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
            startDate: 'start date',
            endDate: 'end date',
            ButtonType: -1

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
        let { CurantSelected } = this.state
        let text = ['طعام', 'شراب', 'تعليم', 'مسرح', 'رياضة', 'فن', 'اطفال', 'صحة', 'اموال', 'زراعه', 'مساكن', 'مرح', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام', 'طعام',]
        return (<View style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            alignItems: 'center'
        }}>


            {/* //header */}
            {this.state.addPlan && <View style={{ width: '100%', alignItems: 'center' }}>
            
                <View style={[Styles.Header, {
                    width: '90%',
                    height: Height * .08,
                    backgroundColor: Colors.WhiteColor,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }]}>
                    <View style={{
                        width: '50%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity style={{marginHorizontal:Width*.01}} onPress={()=>{
                            this.setState({addPlan:false})
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
                            fontSize: FontSize.LargFontSize,marginHorizontal:Width*.02
                            // marginHorizontal: Width * .04
                        }]}> Add plan or goal </Text>

                    </View>

                    <View style={{
                        width: '25%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}>

                        {/* <TouchableOpacity style={{
                        width: Width * .09,
                        height: Width * .09,
                        borderRadius: Width * .05,
                        backgroundColor: Colors.GrayColor,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image source={Requires.edit} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image
                            source={Requires.remove}
                            resizeMode='contain'
                            style={{
                                width: Width * .05,
                                height: Width * .05
                            }} />
                    </TouchableOpacity> */}


                    </View>

                </View>

                {/* // form enter data */}
                <View style={[Styles.Header, {
                    width: '90%',
                    height: Height * .27,
                    backgroundColor: Colors.WhiteColor,
                    elevation: 4,
                    borderRadius: Width * .03,
                    alignItems: 'center',
                    justifyContent: 'space-evenly'
                }]}>

                    {/* //inputs */}
                    <View style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                    }}>
                        <TextInput
                            autoCorrect={false}
                            onChangeText={(text) => {
                                this.setState({ NamePlan: text })
                            }}
                            placeholder='Goal Name'
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




                        <TextInput
                            autoCorrect={false}
                            onChangeText={(text) => {
                                this.setState({ AmountValue: text })
                            }} keyboardType='numeric'
                            placeholder='targit'
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
                                // fontSize: Width*.03
                                // marginTop: Height * .022
                            }} />
                        <View
                            style={{
                                width: '90%',
                                height: Height * .06,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>

                            <TouchableOpacity onPress={() => {
                            this.setState({ ButtonType: 'start' })
                            this._showDateTimePicker()
                        }} activeOpacity={.5} style={{ width: '46%', height: '100%', borderRadius: Width * .02, borderColor: '#D7D7D7', borderWidth: 1, flexDirection: FixViewsOrder(), justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F9F9', paddingHorizontal: Width * .03 }}>
                                <Text style={[Styles.TextStyle, { width: '60%', color: '#D7D7D7',fontSize:Width*.03 }]}>{this.state.startDate}</Text>
                                <View style={{ width: 1, height: '100%', backgroundColor: '#D7D7D7' }} />
                                <Image source={Requires.claender} resizeMode='contain' style={{ width: Width * .05, height: Width * .05 }} />

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                            this.setState({ ButtonType: 'end' })
                            this._showDateTimePicker()
                        }}
                                activeOpacity={.5}
                                style={{
                                    width: '46%',
                                    height: '100%',
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
                                        width: '60%',fontSize:Width*.03 ,
                                        color: '#D7D7D7'
                                    }]}>{this.state.endDate}</Text>

                            </TouchableOpacity>
                        </View>
                    </View>



                </View>

                {/* // TITLE CHOOSE ICON */}
                <View style={[Styles.Header, { width: '90%', height: Height * .05, marginTop: Height * .03 }]}>
                    <Text style={Styles.TextStyle}>{'Choose  Icon'}</Text>
                </View>


                <View style={[Styles.Header, { width: '90%', height: Height * .48, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }]}>
                    <FlatList
                        numColumns={5}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ width: '100%', justifyContent: 'space-between' }} data={Requires.ICons} renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this.setState({ CurantSelected: index })} activeOpacity={.8} style={{ width: Width * .1, height: Width * .15, alignItems: 'center', justifyContent: 'space-between', marginVertical: Height * .015 }}>
                                        <View style={{ width: Width * .14, height: Width * .14, backgroundColor: CurantSelected == index ? Colors.AppBlueColor : Colors.WhiteColor, borderRadius: Width * .02, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={item} resizeMode='contain' style={{ width: '60%', height: '60%', tintColor: CurantSelected == index ? Colors.WhiteColor : Colors.DarkGrayColor }} />
                                        </View>
                                        {/* <Text style={[Styles.TextStyle, { fontSize: Width * .025, marginTop: Height * .01, color: CurantSelected == index ? Colors.red : Colors.DarkGrayColor }]}>{text[index]}</Text> */}
                                    </TouchableOpacity>

                                </View>
                            )
                        }} />
                </View>
            </View>}



            {this.state.addPlan == false && <View style={{ width: '100%', height: '95%' }}>
                <View style={{  height: '100%', alignItems: 'center' }}>

                    <View style={{ width: '90%',height:Height*.08,justifyContent:'center' }}>
                        <Text style={Styles.FirstCategoryHeader}>Goals</Text>
                    </View>
                     {/* // swiper */}
                     <View style={{width:'100%',height:Height*.1,alignItems:'center',justifyContent:'center'}}>
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

                        >Oct 2018</Text>
                        <Image source={Requires.arrow_right} style={{
                            width: Width * .03,
                            tintColor: 'red',
                            resizeMode: 'contain'
                        }} />
                    </View>
                    </View>
                    {/* // _________________________________________________________ */}
                    <ScrollView
                        contentContainerStyle={{
                            width: Width,
                            // height:Height*.5,
                            // marginBottom: Height * .1,
                            justifyContent: 'center', alignItems: 'center',paddingBottom:Height*.02
                        }}

                    >
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
                    </ScrollView>
                </View>


            </View>}
            <TouchableOpacity onPress={() => {
                this.setState({ addPlan: !this.state.addPlan })

                // ios-save
            }} style={{ position: 'absolute', elevation: 7, top: Height * .01, right: Width * .07 }}>
                <Ionicons name={this.state.addPlan ? 'md-checkmark-circle' : 'md-add-circle'} size={Width * .1} color={Colors.GreenColor} />
            </TouchableOpacity>
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
            />
        </View>
        )
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
    componentDidMount() {

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
export { add_plan } 