//Xử lý state khi xuất hiện event mới do users
//** --------- */
//import constants
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

const initialState = {
    kichCo: "",
    loaiPizza: "",
    maGiamGia: "",
    hoTen: "",
    soDienThoai: "",
    email: "",
    diaChi: "",
    loiNhan: ""
};

function AddNewOrderReducers (state = initialState, action) {
    switch(action.type) {
        case PIZZA_SIZE_INPUT:
            return{
                ...state,
                kichCo: action.payload
            }
        case PIZZA_TYPE_INPUT:
            return{
                ...state,
                loaiPizza: action.payload
            }
        case VOUCHER_ID_INPUT:
            return{
                ...state,
                maGiamGia: action.payload
            }    
        case NAME_INPUT:
            return{
                ...state,
                hoTen: action.payload
            }
        case PHONE_INPUT:
            return{
                ...state,
                soDienThoai: action.payload
            }   
        case EMAIL_INPUT:
            return{
                ...state,
                email: action.payload
            }
        case ADDRESS_INPUT:
            return{
                ...state,
                diaChi: action.payload
            }
        case MESSAGE_INPUT:
            return{
                ...state,
                loiNhan: action.payload
            }          
        default:
            return state
    };
};

export default AddNewOrderReducers;