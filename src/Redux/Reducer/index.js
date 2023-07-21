import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { fackDoctordata } from "./doctor.reducer";


export const rootReducer = combineReducers({
    counter: counterReducer,
    data: fackDoctordata
})
