//Action creators
//** --------- */

import {
    PIZZA_SIZE_INPUT,
    PIZZA_TYPE_INPUT,
    VOUCHER_ID_INPUT,
    NAME_INPUT,
    PHONE_INPUT,
    EMAIL_INPUT,
    ADDRESS_INPUT,
    MESSAGE_INPUT
} from "../constants/AddOrderForm";



function pizzaSize (value) {
    return{
        type: PIZZA_SIZE_INPUT,
        payload: value
    }
};

function pizzaType (value) {
    return{
        type: PIZZA_TYPE_INPUT,
        payload: value
    }
};

function voucherIdInput (value) {
    return{
        type: VOUCHER_ID_INPUT,
        payload: value
    }
};

function nameInput (value) {
    return{
        type: NAME_INPUT,
        payload: value
    }
};

function phoneInput (value) {
    return{
        type: PHONE_INPUT,
        payload: value
    }
};

function emailInput (value) {
    return{
        type: EMAIL_INPUT,
        payload: value
    }
};

function addressInput (value) {
    return{
        type: ADDRESS_INPUT,
        payload: value
    }
};

function messageInput (value) {
    return{
        type: MESSAGE_INPUT,
        payload: value
    }
};

export {
    pizzaSize,
    pizzaType,
    voucherIdInput,
    nameInput,
    phoneInput,
    emailInput,
    addressInput,
    messageInput
};