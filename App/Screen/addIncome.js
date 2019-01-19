import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
import { Requires, incomeCategory } from '../Assets/Requires';
import { CustomTextInput } from './../Components/TextInput'
import { Colors, FontFamilies, Width, Height, FixViewsOrder } from '../Global';
import { strings, isArabic } from '../locals';
import { connect } from 'react-redux';
import { AppReducer } from './../state/reducer';
const editIncome = AppReducer.updateIncome;
const editExpense = AppReducer.updateExpense;
class AddIncome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            income: '',
            selectedCatogry: -1,
            selectedData: null,
            IncomeOrExpence:1,
            pleaseHolder:[strings('Income'),strings('Expenses')]
        }
    }
    render() {
        let {IncomeOrExpence}=this.state
        let { selectedCatogry } = this.state
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: '#fff',
            }}>
                <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                    <Image
                        source={Requires.addIncomeLogo}
                        style={{
                            width: Width * .7,
                            height: Height * .3,
                            resizeMode: 'contain'
                        }}
                    />
                    <View style={{
                        width: Width * .7,
                        height: Height * .1,
                        marginBottom: Height * .07,
                    }}>
                        <Text style={{
                            color: Colors.BlackColor,
                            fontSize: 22,
                            fontFamily:FontFamilies.Etisalat_0,
                            textAlign: 'center'
                        }}>
                            {strings('headingIcomeScreen')}
                    </Text>
                        <Text style={{
                            fontSize: 18,
                            fontFamily:FontFamilies.Etisalat_0,
                            textAlign: 'center'
                        }}>{strings('description')}</Text>  
                    </View>
                    <View style={{width:Width*.94,height:Height*.09,alignItems:'center',justifyContent:'space-between',flexDirection:FixViewsOrder(),paddingHorizontal:Width*.02}}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({IncomeOrExpence:2})
                    }} style={{width:'48%',height: Height * .065,backgroundColor:IncomeOrExpence==2? Colors.AppBlueColor:Colors.WhiteColor,alignItems:'center',justifyContent:'center',borderRadius:Width*.05,elevation:3}}>
                    <Text style={{fontSize:12,color:IncomeOrExpence==1? Colors.DarkGrayColor:Colors.WhiteColor}}>{strings('Expenses')}</Text>
                    </TouchableOpacity>
                  
                    <TouchableOpacity onPress={()=>{
                        this.setState({IncomeOrExpence:1})
                    }} style={{ width:'48%',height: Height * .065,backgroundColor:IncomeOrExpence==1? Colors.AppBlueColor:Colors.WhiteColor,alignItems:'center',justifyContent:'center',borderRadius:Width*.05,elevation:3}}>
                    <Text style={{fontSize:12,color:IncomeOrExpence==2? Colors.DarkGrayColor:Colors.WhiteColor}}>{strings('Income')}</Text>
                    </TouchableOpacity>

                   
                    
                    </View>
                    <View style={{ width: '90%', height: Height * .2, alignItems: 'center', justifyContent: 'center' }}>
                        <FlatList contentContainerStyle={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} horizontal data={incomeCategory[parseInt(this.state.IncomeOrExpence)-1 ]} renderItem={({ item, index }) => {
                            return (<TouchableOpacity onPress={() => {
                                this.setState({ selectedCatogry: item.id, selectedData: item })
                            }} style={{height: Width * .2, marginHorizontal: Width * .03, alignItems: 'center', justifyContent: 'center' }}>
                                <Image resizeMode='contain' style={{ width: '60%', height: '50%', tintColor: selectedCatogry == item.id ? Colors.greenlite : null }} source={item.icon} />
                                <Text style={{ color: selectedCatogry == item.id ? Colors.greenlite : null }}>{item.text}</Text>
                            </TouchableOpacity>)
                        }} />
                    </View>
                    <CustomTextInput
                    NotIcon
                        value={this.state.income}
                        keyboardType='numeric'
                        Title={this.state.pleaseHolder[this.sta]}
                        
                        onChangeText={(text) => {

                            this.setState({ income: text })

                        }}
                        icon={Requires.money1}
                    />

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={async () => {
                            try {
                                let { selectedData, selectedCatogry } = this.state
                                if (selectedData) {
                                   let intVal = parseFloat(this.state.income);
                                   if (IncomeOrExpence==1)
                                    this.props.editIncome(intVal);
                                   else  {this.props.editExpanse(intVal)
                                }
                                    // let data = { date: new Date(), IncomeValue: intVal, CategoryId: selectedData.id, CategoryName: selectedData.text }
                                    // let _data = []
                                    // let currantIncome = []
                                    // if (!Number.isInteger(intVal)) intVal = ldfjs
                                    // let _key = (new Date().getMonth().toString() + new Date().getFullYear().toString()).toString()
                                    // let storeIncome = await AsyncStorage.getItem('Incomedata' + _key)
                                    // //console.log('Incomedata' + _key, "successfully")
                                    // if (storeIncome) {
                                    //     currantIncome = JSON.parse(storeIncome)
                                    //     currantIncome.forEach((element) => {
                                    //         if (element.CategoryId != selectedCatogry)
                                    //             _data.push(element)
                                    //     })
                                    //     _data.push(data)
                                    //     AsyncStorage.setItem('Incomedata' + _key, JSON.stringify(_data))
                                    // }
                                    // else {
                                    //     AsyncStorage.setItem('Incomedata' + _key, JSON.stringify([data]))
                                    //     //console.log(intVal,"intValintValintVal")
                                    //     setSavedMonthlyIncome(intVal);
                                    // }
                                    // let totalValue = intVal
                                    // _data.forEach(element => {
                                    //     totalValue = totalValue + element.IncomeValue
                                    // });
                                    // setSavedMonthlyIncome(totalValue);
                                    // let HomeScreenRef = getHomeScreen();
                                    // HomeScreenRef.setState((prev) => ({ stateChanger: prev.stateChanger }))
                                    // //console.log(_data, "successfully")
                                     this.props.navigation.navigate('Home')
                                    // this.setState({ income: '', selectedCatogry: -1, selectedData: null })
                                }
                                else
                                    global.openToast(strings('alertChooseType'));
                            } catch (error) {
                                //console.log(error, "selectedData11")
                                global.openToast(strings('validNumber'));
                            }
                        }}
                        style={{
                            marginTop: Height * .05,
                            backgroundColor: Colors.AppBlueColor,
                            borderRadius: Width * .1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: Height * .065,
                            width: Width * .9,
                            paddingHorizontal: Width * .06
                        }}>
                        <Text style={{
                            fontFamily: FontFamilies.Etisalat_0,
                            fontSize: 17,
                            color: Colors.WhiteColor,
                        }}>{strings('save')}</Text>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity style={{left:Width*.05,position:'absolute',top:Height*.04}} onPress={()=>{
                      this.props.navigation.goBack()
                        }}>
                        <View style={{transform:[{rotate:isArabic()? '180deg':'0deg'}]}}>
                        <Image
                            source={Requires.back}
                            resizeMode='contain'
                            style={{
                                width: Width * .07,
                                height: Width * .07
                            }} />
                        </View>
                       
                    </TouchableOpacity >
            </View>
        )
    }
}



function mapStateToProps(state) {
    // //console.log("TAG", "previous profile", state)
   
    return {
      income: state.appReducer.income,
    // onBoardingDataLoaded: state.userReducer.onBoardingDataLoaded,
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      editIncome : (value) => dispatch(editIncome(value)),
      editExpanse: (value)=> dispatch(editExpense(value))
    }
  }
  
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddIncome)