//Action creators
//** --------- */

import {
    FETCH_ORDERS_PENDING,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_ERROR,
    PAGINATION_CHANGE,
    FETCH_DRINKS_PENDING,
    FETCH_DRINKS_SUCCESS,
    FETCH_DRINKS_ERROR,
    SELECT_DRINK,
    FETCH_VOUCHERS_PENDING,
    FETCH_VOUCHERS_SUCCESS,
    FETCH_VOUCHERS_ERROR
} from "../constants/BaseUrlApi";

import {
    BASE_URL_ORDERS,
    BASE_URL_DRINKS,
    BASE_URL_VOUCHERS
} from "../constants/BaseUrlApi";


//Gọi API, READ thông tin orders 
const FetchApiOrders = () => async dispatch => {

    var requestOptions = {
        method: "GET",
        redirect: "follow"
    }

    await dispatch({
        type: FETCH_ORDERS_PENDING
    });

    try {
        const response = await fetch(
            BASE_URL_ORDERS, requestOptions
        );

        const data = await response.json();

        return dispatch({
            type: FETCH_ORDERS_SUCCESS,
            data: data
        });
    } catch (err) {
        return dispatch({
            type: FETCH_ORDERS_ERROR,
            error: err
        });
    }
};

//Sự kiện thay đổi page
const paginationChange = (value) => {
    return{
        type: PAGINATION_CHANGE,
        payload: value
    };
};

//Get drinks list từ API
const FetchApiDrinks = () => async dispatch => {

    var requestOptions = {
        method: "GET",
        redirect: "follow"
    }

    await dispatch({
        type: FETCH_DRINKS_PENDING
    });

    try {
        const response = await fetch(
            BASE_URL_DRINKS, requestOptions
        );

        const data = await response.json();

        return dispatch({
            type: FETCH_DRINKS_SUCCESS,
            data: data
        });
    } catch (err) {
        return dispatch({
            type: FETCH_DRINKS_ERROR,
            error: err
        });
    }
};

//Gọi API, READ thông tin select drink
const getDrinkSelected = (value) => {
    return{
        type: SELECT_DRINK,
        payload: value
    }
}

//Gọi API, READ thông tin voucher theo voucherId
const FetchApiVouchers = () => async dispatch => {

    var requestOptions = {
        method: "GET",
        redirect: "follow"
    }

    await dispatch({
        type: FETCH_VOUCHERS_PENDING
    });

    try {
        const response = await fetch(
            BASE_URL_VOUCHERS, requestOptions
        );

        const data = await response.json();

        return dispatch({
            type: FETCH_VOUCHERS_SUCCESS,
            data: data
        });
    } catch (err) {
        return dispatch({
            type: FETCH_VOUCHERS_ERROR,
            error: err
        });
    }
};

export {
    FetchApiOrders,
    paginationChange,
    FetchApiDrinks,
    getDrinkSelected,
    FetchApiVouchers
};



