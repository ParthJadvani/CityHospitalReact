import { combineReducers } from "redux";
// import { counterReducer } from "./counter.reducer";
import { fackDoctordata } from "./doctor.reducer";
import { medicineReducer } from "./medicine.reducer";
// import { cartReducer } from "./cart.reducer";
import { favReducer } from "./fav.reducer";
import counterReducer from "../Slice/counterSlice";
import cartReducer from "../Slice/cartSlice";
import { departmentReducer } from "./department.reducer";


export const rootReducer = combineReducers({
    counter: counterReducer,
    data: fackDoctordata,
    medicine: medicineReducer,
    cart: cartReducer,
    favourite: favReducer,
    department: departmentReducer
})
