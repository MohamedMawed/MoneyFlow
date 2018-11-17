import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator

} from 'react-native';
import { Requires } from '../Assets/Requires';
import {CustomTextInput} from './../Components/TextInput'
import { Colors, FontFamilies, Width, Height } from '../Global';
import monthlyIncome, { setSavedMonthlyIncome, getSavedMonthlyIncome, getHomeScreen } from './../Global/API';
export class AddIncome extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <View style={{
                flex:1,
                alignItems:'center',
                backgroundColor: Colors.WhiteColor,
            }}>
                <Image
                    source={Requires.addIncomeLogo}
                    style={{
                        width:Width*.7,
                        height:Height*.4,
                        resizeMode:'contain'
                    }}
                />
                <View style={{
                    width:Width*.7,
                    height:Height*.1,
                    marginBottom:Height*.07,
                }}>
                    <Text style={{
                        color:Colors.BlackColor,
                        fontSize:22,
                        fontWeight:'600',
                        textAlign:'center'
                    }}>
                        Heading Title
                    </Text>
                    <Text style={{
                        fontSize:18,
                        fontWeight:'400',
                        textAlign:'center'
                    }}>
                    add your income from this month to monitor

                    </Text>
                </View>

                <CustomTextInput
                    Title={'income'}
                
                    onChangeText={(text) => {
                        this.setState({ Name: text })
                    }}
                    icon={Requires.money1}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={()=>{
                        try{
                            let intVal = parseFloat(this.state.Name);
                            if(!Number.isInteger(intVal))intVal=ldfjs
                            setSavedMonthlyIncome(intVal);
                            let HomeScreenRef = getHomeScreen();
                            HomeScreenRef.setState((prev)=>({stateChanger:prev.stateChanger}))
                            alert('Income Added successfully')
                        }catch(error){

                        alert('Please enter valid number');
                        }
                    }}
                    style={{
                        marginTop:Height*.1,
                        backgroundColor: Colors.BtnLoginBack,
                        borderRadius: Width * .1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: Height*.065,
                        width: Width * .9,
                        paddingHorizontal: Width * .06
                    }}>
                        <Text style={{
                            fontFamily: FontFamilies.Etisalat_0,
                            fontSize: 18,
                            color: Colors.WhiteColor,
                        }}>Save</Text>
                </TouchableOpacity>

            </View>
        )
    }
}