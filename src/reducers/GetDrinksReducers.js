//Xử lý state khi xuất hiện event mới do users
//** --------- */

import {
    FETCH_DRINKS_PENDING,
    FETCH_DRINKS_SUCCESS,
    FETCH_DRINKS_ERROR,
    SELECT_DRINK
} from "../constants/BaseUrlApi";

const initialState = {
    drinks: [],
    drinkSelected: "",
    pending: false,
    error: null
}

function GetDrinkReducers (state = initialState, action) {
    switch(action.type) {
        case FETCH_DRINKS_PENDING:
            return{
                ...state,
                pending: true
            }
        case FETCH_DRINKS_SUCCESS:
                return{
                    ...state,
                    drinks: action.data,
                    pending: false
                }
        case FETCH_DRINKS_ERROR:
                return{
                    ...state,
                    error: action.error,
                    pending: false
                }
        case SELECT_DRINK:
                return{
                    ...state,
                    drinkSelected: action.payload,
                }
        default:
            return state;
    }
};

export default GetDrinkReducers;