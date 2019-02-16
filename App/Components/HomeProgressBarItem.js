import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { CustomTextInput } from '../Components/TextInput';
import { Width, Height } from '../Global/Dimension';
import { Requires } from '../Assets/Requires';
import { FontFamilies, FontSize } from '../Global/Font';
import { Colors } from '../Global/Colors';
import { FixViewsOrder } from '../Global';
import { strings } from '../locals';
import DropDown from './DropDownWithoutButtonText';
import {connect } from 'react-redux';
import Dropdown2 from './Dropdown2';
import { AppReducer } from '../state/reducer';
const deleteGoal = AppReducer.deleteGoal;

export const BudgetItem = ({ onEditBudget, Source, cost, Category, date, payment_period,onRemove }) => {
    let text=''
    let dayes=0         
    console.log('ToDATAAAToDATAAAddddfdfdfdfffdfdfdf',parseInt(payment_period))
           var r=false
           var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
           let _lastDayes=0
           let today=new Date()
            let time=today.toString().split(' ')[4]
           let selectedDate=new Date(date.split('-')[0],date.split('-')[1]-1,date.split('-')[2],time.split(':')[0],time.split(':')[1],time.split(':')[2])
           if  (parseInt( selectedDate.getTime())>= parseInt(today.getTime()) ){
            text='witing start'   
          r=0
           }else
           {
               
            _flag=false
            var firstDate = new Date(date.split('-')[0],date.split('-')[1]-1,date.split('-')[2]);
            var secondDate = new Date(date.split('-')[0],date.split('-')[1]-1, (parseInt(date.split('-')[2])));
            if  (parseInt(payment_period) ==0)
              dayes=7*oneDay
              else if (parseInt(payment_period)==1)
              dayes=30*oneDay
              else if (parseInt(payment_period)==2)
              dayes=365*oneDay

            let   lastDayes = Math.round(Math.abs(((firstDate.getTime())-today.getTime())));
            _lastDayes=lastDayes
             text = Math.round(Math.abs((firstDate.getTime() - ((secondDate.getTime()+dayes)-lastDayes ) )/(oneDay)));
           r=((Width*.85/100)*(((_lastDayes/dayes)*100)))
           }
      
// var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
console.log("diffDaysdiffDays",date)
    return (
        <View style={[styles.container, { paddingTop: 0, height: Height * .15 ,backgroundColor:'#fff'}]}>

            <TouchableOpacity activeOpacity={1} style={[{ height: '100%', alignItems: 'center',width:'100%' }]}>


                <View style={{ width: '100%', height: '60%', alignItems: 'center', justifyContent: 'center', flexDirection: FixViewsOrder() }}>
                    <View style={{ width: Width * .27, height: '100%', alignItems: 'center' }} >

                        <View style={{ width: '70%', height: '100%', flexDirection: FixViewsOrder(),justifyContent:'flex-start',marginTop:Height*.01 }}>


                      <View style={{width:'50%',height:Height*.06}}>
                        <DropDown
                        onSelect={(index) => {
                            if(index.text == strings('allPlans_remove')){
                                onRemove()
                            }else if(index.text == strings('allPlans_edit')){
                               onEditBudget()
                            }
                        }}
                        defaultValue={''}
                        Data={[
                            { text: strings('allPlans_edit'), Icon: Requires.edit },
                            { text: strings('allPlans_remove'), Icon: Requires.remove }
                             ]}
                        Width={Width * .1}
                        DropdownWidth={Width * .3} />
                        </View>
{/* 
                        
                            <TouchableOpacity onPress={onRemove} >
                                <View style={{ width: Width * .08, height: Width * .08, borderRadius: Width * .05, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center', borderColor: Colors.DarkGrayColor, backgroundColor: Colors.GrayColor }}>
                                    <Image source={Requires.remove} resizeMode='contain' style={{ width: '50%', height: '50%', tintColor: Colors.DarkGrayColor }} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onClick}>
                                <View style={{ width: Width * .08, height: Width * .08, borderRadius: Width * .05, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.GrayColor }}>
                                    <Image source={Requires.edit} resizeMode='contain' style={{ width: '50%', height: '50%', tintColor: Colors.DarkGrayColor }} />
                                </View>
                            </TouchableOpacity> */}
                        </View>

                    </View>


                    <View style={{ width: Width * .5, height: '100%',justifyContent:'center' }}>
                    <Text style={[styles.HeaderTitle,{fontFamily: FontFamilies.Etisalat_0}]}>{Category}</Text>

                        {/* <Text style={[{ color: Colors.BlackColor, fontSize:FontSize.LargFontSize,width:'100%' ,textAlign:'left',fontFamily:FontFamilies.Etisalat_0}]}>{Category}</Text> */}
                        <View style={{ flexDirection: FixViewsOrder(), justifyContent: 'flex-end' }}>
                            {/* <Text style={[styles.ItemCostText, { color: Colors.DarkGrayColor, fontSize: 14 }]}>{payment_period}</Text> */}
                            <Text style={[{ color: Colors.DarkGrayColor, fontSize: 12,fontFamily:FontFamilies.Etisalat_0 }]}>{strings('Remaining')+" " +text +" " +strings('days') }</Text>
                        </View>
                    </View>

                    <View style={{ width: Width * .17, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <View style={[{ backgroundColor: "#7276CF", width: Width * .09, height: Width * .09, alignItems: 'center', justifyContent: 'center', borderRadius: Width * .1 }]}>
                            <Image source={Source} resizeMode='contain' style={{ width: '60%', height: '60%', tintColor: '#fff' }} />
                        </View>
                    </View>
                </View>


                <View style={{ width: '100%', height: '40%',alignItems:'center' }}>

                <View style={{width:Width*.85,height:Height*.012,backgroundColor:"#7276CF",borderRadius:Width*.08,overflow:'hidden'}} >
                {/* <View style={{width:Width*.85,height:Height*.012,backgroundColor:'#7276CF',borderRadius:Width*.08,position:'absolute',left:(-Width*.85)+r}} /> */}

                {/* <View style={{width:Width*.85,height:Height*.012,backgroundColor:'#7276CF',borderRadius:Width*.08,position:'absolute',left:Width*.85}} /> */}

</View>
              <View style={{width:'92%',alignItems:'center',justifyContent:'space-between',marginTop:Height*.005,flexDirection:'row'}}>
              <Text style={{fontFamily:FontFamilies.Etisalat_0,color:'#EBEBEB',fontSize:15}}>0</Text>

              <Text style={{fontFamily:FontFamilies.Etisalat_0,color:'#7276CF',fontSize:FontSize.MediumFontSize}}>{cost}</Text>
              </View>
              
                 {/* <View style={[styles.ItemCostContainer, { borderColor: Colors.GreenColor, marginTop: Height * .012 }]}>
                    <Text style={[styles.ItemCostText, { color: Colors.GreenColor }]}
                    >{cost}</Text>
                </View> */}
                
                </View>
               
            </TouchableOpacity>


        </View>
    )
}





class HomeProgressBarItem extends Component {
    CalcColor = () => {
    }
    render() {
        let { nameCategory, Percent } = this.props
        return (
            <View style={styles.container}>
                <View activeOpacity={1}
                    // onPress={this.props.onClick} 
                    style={styles.ItemRow}>

                    {/* for item Icon */}
                    <View style={[styles.ItemIconContainer, { backgroundColor:Colors.AppBlueColor, }]}>
                        <Image source={this.props.Source} style={styles.ItemIcon} />
                    </View>
                    {/* for item Header and remaingin time */}
                    <View style={styles.HeaderContainer}>
                        <Text style={[styles.HeaderTitle,{fontFamily: FontFamilies.Etisalat_0}]}>{nameCategory}</Text>
            
                        <Text style={[styles.HeaderRemainingDays,{fontFamily: FontFamilies.Etisalat_0}]}>{this.props.remains ? this.props.remains + ' ' + strings('allPlans_remain'):'Finished'} </Text>
                    </View>
                    <DropDown
                        onSelect={(index) => {
                            if(index.text == strings('allPlans_remove')){
                                this.props.deleteGoal(this.props.index)
                            }else if(index.text == strings('allPlans_add')){
                                this.props.openAddAlert()
                            }else {
                                this.props.openEditAlert()
                            }
                        }}
                        defaultValue={''}
                        Data={[
                            { text: strings('allPlans_add'), Icon: Requires.PlusAdd },
                            { text: strings('allPlans_edit'), Icon: Requires.edit },
                            { text: strings('allPlans_remove'), Icon: Requires.remove }
                             ]}
                        Width={Width * .1}
                        DropdownWidth={Width * .3} />
                </View>

                <View style={styles.ProgressBarContainer}>
                <View style={{ elevation: 2, width: Width * .9 * (this.props.Percent / 100), height: '100%', backgroundColor: Colors.AppBlueColor }} />

                    {/* <View style={{ elevation: 2, width: Width * .9 * (this.props.Percent / 100), height: '100%', backgroundColor: this.props.BackColor }} /> */}
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '92%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: Height * .03,
                }}>
                                    <Text style={{ fontFamily: FontFamilies.Etisalat_0, color: Colors.BigMediumColor, fontSize: 14 }}>0</Text>

                    {/* <Text style={{ fontFamily: FontFamilies.Etisalat_0, color: Colors.BigMediumColor, fontSize: 14 }}>{this.props.startWith}</Text> */}
                    <Text style={{ fontFamily: FontFamilies.Etisalat_0, color:Colors.AppBlueColor, fontSize: 16 }}>{this.props.currentlyPaid}</Text>
                    <Text style={{ fontFamily: FontFamilies.Etisalat_0, color: Colors.BigMediumColor, fontSize: 14 }}>{this.props.cost}</Text>
                </View>

            </View>
        )
    }
}






const styles = StyleSheet.create(
    {
        container: {
            paddingTop: Height * .01,
            width: Width * .94,
            height: Height * .17,
            borderRadius: Width * .02,
            marginTop: Height * .02,
            elevation: 3,
             backgroundColor: Colors.WhiteColor,
            // justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },
        ItemCostText: {
            fontFamily: FontFamilies.Etisalat_0,
            fontSize: FontSize.LargFontSize,
            textAlign: 'center',
            width: Width * .2
        },
        ItemCostContainer: {
            flexDirection: 'row',
            width: Width * .1,
            height: Height * .04,
            alignItems: 'center',
            justifyContent: 'space-around'

        },
        HeaderRemainingDays: {
            fontSize: FontSize.MediumFontSize,
            color: 'gray',
            textAlign: 'left',
            width: '100%'
        },
        HeaderTitle: {
            fontFamily: FontFamilies.Etisalat_0,
            fontSize: FontSize.LargFontSize,
            color: '#000',
            width: '100%',
            textAlign: 'left',
        },
        HeaderContainer: {
            width: Width * .55,
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        ProgressBarContainer: {
            width: '92%',
            height: Height * .015,
            alignItems: 'flex-start',
            borderRadius: Height * .03, overflow: 'hidden',
            backgroundColor: '#EBEBEB', marginTop: Height * .005

        },
        ItemRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            paddingTop: Height * .005,
            overflow: 'hidden',
            // alignItems: 'center',
            height: Height * .085, marginTop: Height * .01

        },
        ItemIconContainer: {
            width: Width * .11,
            height: Width * .11,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Width * .1,
            overflow: 'hidden'
        },
        ItemIcon: {
            resizeMode: 'contain',
            width: Width * .06,
            height: Width * .06,
            tintColor: '#fff'
        }
    }
)




function mapStateToProps(state) {
    // console.log("TAG", "previous profile", state)

    return {
        appData: state.appReducer,
        income: state.appReducer.income,
        expense: state.appReducer.expense,
        goal: state.appReducer.goal,
        budget: state.appReducer.budget,
    }
}



function mapDispatchToProps(dispatch) {
    return {
        deleteGoal: (value) => dispatch(deleteGoal(value)),
    }
}
export default connect(
    mapStateToProps,mapDispatchToProps
)(HomeProgressBarItem)