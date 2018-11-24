import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator, ScrollView, AsyncStorage, FlatList,Alert

} from 'react-native';
import { Requires, incomeCategory } from '../Assets/Requires';
import { CustomTextInput } from './../Components/TextInput'
import { Colors, FontFamilies, Width, Height } from '../Global';
import monthlyIncome, { setSavedMonthlyIncome, getSavedMonthlyIncome, getHomeScreen } from './../Global/API';
export class AddIncome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            income: '',
            selectedCatogry: -1,
            selectedData: null
        }
    }
    render() {
        let { selectedCatogry } = this.state
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: Colors.WhiteColor,
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
                            fontWeight: '600',
                            textAlign: 'center'
                        }}>
                            Heading Title
                    </Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '400',
                            textAlign: 'center'
                        }}>add your income from this month to monitor</Text>         
                    </View>
                    <View style={{ width: '90%', height: Height * .2, alignItems: 'center', justifyContent: 'center' }}>
                        <FlatList contentContainerStyle={{ height: '100%', justifyContent: 'center', alignItems: 'center' }} horizontal data={incomeCategory} renderItem={({ item, index }) => {
                            return (<TouchableOpacity onPress={() => {
                                this.setState({ selectedCatogry: item.id, selectedData: item })
                            }} style={{ width: Width * .2, height: Width * .2, marginHorizontal: Width * .05, alignItems: 'center', justifyContent: 'center' }}>
                                <Image resizeMode='contain' style={{ width: '60%', height: '50%', tintColor: selectedCatogry == item.id ? Colors.greenlite : null }} source={item.icon} />
                                <Text style={{ color: selectedCatogry == item.id ? Colors.greenlite : null }}>{item.text}</Text>
                            </TouchableOpacity>)
                        }} />
                    </View>
                    <CustomTextInput
                        value={this.state.income}
                        keyboardType='numeric'
                        Title={'income'}

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
                                    let data = { date: new Date(), IncomeValue: intVal, CategoryId: selectedData.id, CategoryName: selectedData.text }
                                    let _data = []
                                    let currantIncome = []
                                    if (!Number.isInteger(intVal)) intVal = ldfjs
                                    let _key = (new Date().getMonth().toString() + new Date().getFullYear().toString()).toString()

                                    let storeIncome = await AsyncStorage.getItem('Incomedata' + _key)
                                    console.log('Incomedata' + _key, "successfully")
                                    if (storeIncome) {
                                        currantIncome = JSON.parse(storeIncome)
                                        currantIncome.forEach((element) => {
                                            if (element.CategoryId != selectedCatogry)
                                                _data.push(element)
                                        })
                                        _data.push(data)
                                        AsyncStorage.setItem('Incomedata' + _key, JSON.stringify(_data))
                                    }
                                    else {
                                        AsyncStorage.setItem('Incomedata' + _key, JSON.stringify([data]))
                                        console.log(intVal,"intValintValintVal")

                                        setSavedMonthlyIncome(intVal);

                                    }
                                    let totalValue = intVal
                                    _data.forEach(element => {
                                        totalValue = totalValue + element.IncomeValue
                                    });
                                    setSavedMonthlyIncome(totalValue);
                                    let HomeScreenRef = getHomeScreen();
                                    HomeScreenRef.setState((prev) => ({ stateChanger: prev.stateChanger }))
                                    console.log(_data, "successfully")
                                   Alert.alert("successfully",'Income Added successfully',[{text:'ok',onPress:()=>{
                                    this.props.navigation.navigate('Home')

                                    this.setState({ income: '', selectedCatogry: -1, selectedData: null })
                                   }}])
                                }
                                else
                                    alert('Please Choose Category Type');
                            } catch (error) {
                                console.log(error, "selectedData11")

                                alert('Please enter valid number');
                            }
                        }}
                        style={{
                            marginTop: Height * .05,
                            backgroundColor: Colors.BtnLoginBack,
                            borderRadius: Width * .1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: Height * .065,
                            width: Width * .9,
                            paddingHorizontal: Width * .06
                        }}>
                        <Text style={{
                            fontFamily: FontFamilies.Etisalat_0,
                            fontSize: 18,
                            color: Colors.WhiteColor,
                        }}>Save</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        )
    }
}