import * as React from 'react'

import { createBottomTabNavigator, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import {
    Image,
    Text,
    View
} from "react-native";
import { Width, Height } from './../Global/Dimension'
import { Requires } from '../Assets/Requires';
import Login from './Login';
import { Splash } from './Splash';

import { Register } from './Register';
import Home  from './Home'
import { ExportTab } from './Export';
import { EditProfile } from './EditProfile';
import { Intro } from './Intro';
import { Setting } from './Setting';
import { plan } from './plan';
import AddIncome from './addIncome';
import add_plan from './add_plan';
import { strings } from '../locals';
import { FontFamilies, Colors } from '../Global';
import  BudgetList  from './BudgetList';
import AddBudget from './AddBudget';
import EditBudget from './editBudget';
import PlanList from './planList';
import Add_plan from './add_plan';
import Editplan from './editplan';
import ForgotPassword from './ForgotPassword';
const Tabs = createBottomTabNavigator(
    {
        Home: Home,
        Report: BudgetList,
        Plan: PlanList,
        Setting: Setting,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let myTintColor = tintColor
                if (routeName == 'Plus') myTintColor = null
                let IconWidth = routeName == 'Plus' ? Width * .15 : Width * .06
                return <View style={{flexDirection:'row',alignItems:'center',width:Width*.25,justifyContent:'center'}}>
                    
                    <View style={{width:Width * .07,height:Width * .0,borderRadius:Width*.035,alignItems:'center',justifyContent:'center'}}>
                    <Image source={Requires[routeName]}
                    style={{
                        width: IconWidth,
                        height: IconWidth,
                        resizeMode: 'contain',
                        tintColor: myTintColor
                    }}  />
                    </View>
             

                     {/* <Text style={{fontFamily:FontFamilies.Etisalat_0,padding:10,fontSize:12,color:focused?Colors.AppBlueColor:'grgay'}}>{strings('tap.'+routeName+'')}</Text>        */}
                    </View>
            },
            tabBarLabel: () => null
        }),
        tabBarOptions: {
            activeBackgroundColor: '#F0F0F0',
            activeTintColor:'#5D5FD5',
            inactiveTintColor: null
        },
    }
);


export default App = createStackNavigator(
    {
        Splash: { screen: Splash },
        Add_plan:{screen:Add_plan},
        Main: { screen: Tabs },
        Login: { screen: Login },
        Intro: { screen: Intro },
        Register: { screen: Register },
        EditProfile:{screen:EditProfile},
        ExportTab:{screen:ExportTab},
        EditBudget:{screen:EditBudget},
        plan:{screen : plan},
        Editplan:{screen:Editplan},
        AddBudget:{screen : AddBudget},
        ForgotPassword:{screen : ForgotPassword},
        AddIncome:{screen : AddIncome}

    }, {
        headerMode: 'none'
    }
)