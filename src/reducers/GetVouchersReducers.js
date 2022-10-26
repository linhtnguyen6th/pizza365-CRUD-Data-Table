import {
    FETCH_VOUCHERS_PENDING,
    FETCH_VOUCHERS_SUCCESS,
    FETCH_VOUCHERS_ERROR
} from "../constants/BaseUrlApi";

const initialState = {
    vouchers: [],
    pending: false,
    error: null
};

function GetVouchersReducers (state = initialState, action) {
    switch(action.type) {
        case FETCH_VOUCHERS_PENDING:
            return{
                ...state,
                pending: true
            };
        case FETCH_VOUCHERS_SUCCESS:
            return{
                ...state,
                vouchers: action.data,
                pending: false
            };
        case FETCH_VOUCHERS_ERROR:
            return{
                ...state,
                error: action.error,
                pending: false
            };
        default:
            return state;
    };
};

export default GetVouchersReducers;