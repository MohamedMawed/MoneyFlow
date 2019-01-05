
export class AppReducer {
    constructor() {

    }
    static initialOrderState = {
        "income": 0,
        "expense": 0,
        "budget": [
        ],
        "goal": [
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
                return {
                    ...state,
                    goal: state.goal.length > 1 ? state.goal.splice(action.index, 1) : [],
                }
            case AppReducer.EDIT_GOAL:
                let temp1 = state.goal;
                temp1[action.index].name = action['0'];
                temp1[action.index].money = action['1'];
                temp1[action.index].end_date = action['2'];
                return {
                    ...state,
                    goal: temp1
                }
            case AppReducer.ADD_GOAL_MONEY:
                let temp = state.goal;
                temp[action.index].currently_paid += action.money;
                console.log('tempAfterUpdate',temp);
                return {
                    ...state,
                    goal: temp
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
                    ...action.newBudget,
                };
            case AppReducer.DELETE_BUDGET:
                return initialOrderState;
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
            index, 
            ...data
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
    static editBudget = (newBudget,index) => {
        return {type:AppReducer.EDIT_BUDGET,index,newBudget}
     
    }

    static deleteBudget = (index) => {
        return {
            type: AppReducer.DELETE_BUDGET,
            index
        }
    }

}
