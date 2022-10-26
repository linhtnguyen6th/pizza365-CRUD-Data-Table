//Xử lý state khi xuất hiện event mới do users
//** --------- */

import {
    FETCH_ORDERS_PENDING,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_ERROR,
    PAGINATION_CHANGE
} from "../constants/BaseUrlApi";

const limit = 8; //giới hạn số dòng trên 1 trang

const initialState = {
    rows: [],
    pending: false,
    error: null,
    currentPage: 1,
    noPage: 0
}

export default function GetOrdersReducers (state = initialState, action) {
    switch(action.type) {
        case FETCH_ORDERS_PENDING: 
            return{
                ...state,
                pending: true
            };
        case FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                rows: action.data.slice((state.currentPage - 1) * limit, state.currentPage * limit),
                noPage: Math.ceil(action.data.length / limit),
                pending: false
            };
        case FETCH_ORDERS_ERROR:
            return{
                ...state,
                error: action.error,
                pending: false
            }
        case PAGINATION_CHANGE:
            return{
                ...state,
                currentPage: action.payload
            }
        default:
            return state;
    };
};



