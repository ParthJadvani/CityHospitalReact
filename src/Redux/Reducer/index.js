import { combineReducers } from "redux";
// import { counterReducer } from "./counter.reducer";
import { fackDoctordata } from "./doctor.reducer";
import { medicineReducer } from "./medicine.reducer";
import { cartReducer } from "./cart.reducer";
import { favReducer } from "./fav.reducer";
import counterReducer from "../Slice/counterSlice";
// import cartReducer from "../Slice/cartSlice";
import departmentReducer from "../Slice/departmentSlice";
import alertReducer from "../Slice/alertSlice";
import { authReducer } from "./auth.reducer";
import appointmentReducer from "../Slice/appointmentSlice";
// import { departmentReducer } from "./department.reducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    counter: counterReducer,
    data: fackDoctordata,
    medicine: medicineReducer,
    cart: cartReducer,
    favourite: favReducer,
    department: departmentReducer,
    apt: appointmentReducer
})
