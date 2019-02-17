import { strings } from '../locals';

export class AppReducer {
    constructor() {

    }
    static initialOrderState = {
       
        "income": 0,
        "expense": 0,
        "budget": [
        ],
        "goal": [
        ],
        "IncomeCategoryData": [
            [
                { id: 1, icon: require('../Assets/img/incomeAndExpences/Salary.png'), text: 'Salary'},
                { id: 2, icon: require('../Assets/img/incomeAndExpences/Business.png'), text: 'Business' }
            ],
            [{ id: 1, icon: require('../Assets/img/incomeAndExpences/Bills.png'), text: 'Bills' },
            { id: 2, icon: require('../Assets/img/incomeAndExpences/Groceries.png'), text: 'Groceries'},
            { id: 3, icon: require('../Assets/img/incomeAndExpences/Transportation.png'), text: 'Transportation' },
            { id: 4, icon: require('../Assets/img/incomeAndExpences/shopping.png'), text: 'Shopping' },
            { id: 5, icon: require('../Assets/img/incomeAndExpences/Education.png'), text: 'Education' },
            { id: 6, icon: require('../Assets/img/incomeAndExpences/Health.png'), text: 'HealthFitness' },
            { id: 7, icon: require('../Assets/img/incomeAndExpences/Entertainment.png'), text: 'Entertainment' },
            { id: 8, icon: require('../Assets/img/incomeAndExpences/Gifts.png'), text: 'GiftsDonations' },
            { id: 9, icon: require('../Assets/img/incomeAndExpences/Business.png'), text: 'Business'}
            ]
        ]
        // "income": 1000,
        // "expense": 300,
        // "budget": [
        //     {
        //         "category": "Foot",
        //         "icon_index": 0,
        //         "money": 254,
        //         "payment_period" : 0,
        //         "start_date": "09/23/2017",
        //     },
        //     {
        //         "category": "Foot",
        //         "icon_index": 0,
        //         "money": 254,
        //         "start_date": "09/23/2017",
        //     },
        //     {
        //         "category": "Foot",
        //         "icon_index": 0,
        //         "money": 254,
        //         "start_date": "09/23/2016",
        //     },
        //     {
        //         "category": "Foot",
        //         "icon_index": 0,
        //         "money": 254,
        //         "start_date": "09/23/2017",
        //     },
        //     {
        //         "category": "Foot",
        //         "icon_index": 0,
        //         "money": 254,
        //         "start_date": "09/23/2017",
        //     },
            
        // ],
        // "goal": [
        //     {
        //         "category": "Foot",
        //         "name": "Foot",
        //         "icon_index": 2,
        //         "start_money":100,
        //         "pay_period" : 0, 
        //         "money": 254,
        //         "start_date": "MM/DD/YYYY",
        //         "end_date": "MM/DD/YYYY"
        //     }
        // ]
    };


    reduce(state = AppReducer.initialOrderState, action) {
        console.log(action)
        switch (action.type) {

            case AppReducer.USER_DATA:
                return action.value
            case AppReducer.DELETE_GOAL:
                let newData = state.goal;
                newData.splice(action.index , 1);
                return {
                    ...state,
                    goal: JSON.parse(JSON.stringify(newData))
                }
            case AppReducer.EDIT_GOAL:
                let temp1 = state.goal;
                temp1[action.index].name = action['0'];
                temp1[action.index].money = action['1'];
                temp1[action.index].end_date = action['2'];
                return {
                    ...state,
                    goal: JSON.parse(JSON.stringify(temp1))
                }
            case AppReducer.ADD_GOAL_MONEY:
                let temp = state.goal;
                temp[action.index].currently_paid += action.money;
                return {
                    ...state,
                    goal: JSON.parse(JSON.stringify(temp))
                }
            case AppReducer.CREATE_BUDGET:
                return {
                    ...state,
                    budget : state.budget.concat([action.budget]),
                };
                case AppReducer.CREATE_GOAL:
                return {
                    ...state,
                    goal : state.goal.concat([action.goal]),
                };
            case AppReducer.EDIT_INCOME:
                return {
                    ...state,
                    income: state.income + action.value
                };

                case AppReducer.EDIT_EXPENSE:
                return {
                    ...state,
                    expense: state.expense + action.value
                };

            case AppReducer.EDIT_BUDGET:
            return {
                ...state,
                budget :JSON.parse(JSON.stringify(action.newBudget)) 
            };
            case AppReducer.DELETE_BUDGET:
                return initialOrderState;
                case AppReducer.ADDNEWTYPE:
                let temp2 = JSON.parse(JSON.stringify(state.IncomeCategoryData));
                temp2[action.index].push({
                    id: temp2[action.index].length + 1,
                    icon: action.icon,
                    text: action.text,
                    notranslate:true
                })
                return {
                    ...state,
                    IncomeCategoryData: JSON.parse(JSON.stringify(temp2))
                }    
            default:
                return state;
        }
    }

    static USER_DATA = 'FLOOSY/USER_DATA';
    static EDIT_INCOME = 'FLOOSY/EDIT_INCOME';
    static EDIT_EXPENSE = 'FLOOSY/EDIT_EXPENSE';
    static CREATE_BUDGET = 'BUDGET/NEW_BUDGET';
    static EDIT_BUDGET = 'BUDGET/EDIT_BUDGET';
    static DELETE_BUDGET = 'BUDGET/DELETE_BUDGET';
    static CREATE_GOAL="GOAL/CREATE_GOAL";
    static DELETE_GOAL = "GOAL/DELETE_GOAL";
    static ADD_GOAL_MONEY = "GOAL/ADD_GOAL_MONEY";
    static EDIT_GOAL = "GOAL/EDIT_GOAL";

    static ADDNEWTYPE = "FLOOSY/ADDNEWTYPE";


    static addNewTypeAction = (index, icon, text) => {
        //console.log('this.setAppData',value);
        return {
            type: AppReducer.ADDNEWTYPE,
            index,
            icon,
            text
        }
    }

    static setAppData = (value) => {
        //console.log('this.setAppData',value);
        return {
            type : AppReducer.USER_DATA,
            value
        }
    }



    static editGoal = (index , ...data) => {
        return {
            type : AppReducer.EDIT_GOAL,
            index,...data
           
        }
    }
    static addGoalMoney = (index,money) => {
        console.log('this.deleteGoal',index);        
        return {
            type: AppReducer.ADD_GOAL_MONEY,
            index,
            money
        }
    }
    static deleteGoal = (index) => {
        console.log('this.deleteGoal',index);        
        return {
            type: AppReducer.DELETE_GOAL,
            index
        }
    }
    static updateExpense = (value) => {
        return {
            type: AppReducer.EDIT_EXPENSE,
            value,
        }
    }

    static updateIncome = (value) => {
        return {
            type: AppReducer.EDIT_INCOME,
            value,
        }
    }


static createGoal=(goal)=>{
    return {
        type: AppReducer.CREATE_GOAL,
        goal,
    } 
}
static createBudget = (budget) => {
    return {
        type: AppReducer.CREATE_BUDGET,
        budget,
    }
}
    static editBudget = (newBudget) => {
        console.log()
        return {type:AppReducer.EDIT_BUDGET,newBudget}
     
    }

    static deleteBudget = (index) => {
        return {
            type: AppReducer.DELETE_BUDGET,
            index
        }
    }

}
