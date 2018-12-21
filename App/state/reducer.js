import { Requires } from "../Assets/Requires";

export class AppReducer {
    constructor() {
    }



    static initialOrderState = {
        "income": 1000,
        "expense": 300,
        "budget": [
            {
                "category": "Foot",
                "icon_index": 0,
                "money": 254,
                "start_date": "MM/DD/YYYY",
                "end_date": "MM/DD/YYYY"
            }
        ],
        "goal": [
            {
                "category": "Foot",
                "name": "Foot",
                "icon_index": 2,
                "money": 254,
                "start_date": "MM/DD/YYYY",
                "end_date": "MM/DD/YYYY"
            }
        ]
    };


    reduce(state = AppReducer.initialOrderState, action) {

        switch (action.type) {


            case AppReducer.CREATE_BUDGET:
                return {
                    ...state,
                    budgets: state.budgets.push(state.budget)
                };
            case AppReducer.EDIT_INCOME:
                return {
                    ...state,
                    income: state.income + action.value
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


    static EDIT_INCOME = 'FLOOSY/EDIT_INCOME';
    static CREATE_BUDGET = 'BUDGET/NEW_BUDGET';
    static EDIT_BUDGET = 'BUDGET/EDIT_BUDGET';
    static DELETE_BUDGET = 'BUDGET/DELETE_BUDGET';



    static updateIncome = (value) => {
        return {
            type: AppReducer.EDIT_INCOME,
            value,
        }
    }

    static createBudget = (budget) => {
        return {
            type: AppReducer.CREATE_BUDGET,
            budget,
        }
    }

    static editBudget = (index, newBudget) => {
        console.log('Atribute', newBudget)
        return {
            type: AppReducer.EDIT_BUDGET,
            index,
            newBudget,
        }
    }

    static deleteBudget = (index) => {
        return {
            type: AppReducer.DELETE_BUDGET,
            index
        }
    }

}
