import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { fackDoctordata } from "./doctor.reducer";
import { medicineReducer } from "./medicine.reducer";
import { cartReducer } from "./cart.reducer";
import { favReducer } from "./fav.reducer";


export const rootReducer = combineReducers({
    counter: counterReducer,
    data: fackDoctordata,
    medicine: medicineReducer,
    cart: cartReducer,
    favourite: favReducer
})
