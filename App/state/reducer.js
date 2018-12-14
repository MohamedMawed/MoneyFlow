
export class AppReducer {
    constructor() {
    }



    static initialOrderState = {
        income : 100,
        expense : 50
    };

    
    reduce(state = AppReducer.initialOrderState, action) {

        switch (action.type) {


            case AppReducer.CREATE_BUDGET:
                return {
                    ...state,
                };
            case AppReducer.EDIT_INCOME:
                return {
                    ...state,
                    income : state.income + action.value
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


    static CREATE_BUDGET = 'BUDGET/NEW_BUDGET';
    static EDIT_INCOME = 'FLOOSY/EDIT_INCOME';
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
            type: AppReducer.CREATE_ORDER,
            budget,
        }
    }

    static editBudget = (index , newBudget) => {
        console.log('Atribute',newBudget)
        return {
            type: AppReducer.EDIT_ORDER,
            index,
            newBudget,
        }
    }

    static deleteBudget = (index) => {
        return {
            type: AppReducer.DELETE_ORDER,
            index
        }
    }

}
