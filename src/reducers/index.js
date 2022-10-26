import { combineReducers } from "redux";
import GetOrdersReducers from "./GetOrdersReducers";
import GetDrinkReducers from "./GetDrinksReducers";
import AddNewOrderReducers from "./AddNewOrderReducers";
import GetVouchersReducers from "./GetVouchersReducers";



const rootReducer = combineReducers({
    GetOrdersReducers,
    GetDrinkReducers,
    AddNewOrderReducers,
    GetVouchersReducers
});

export default rootReducer;
