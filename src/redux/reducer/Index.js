import { combineReducers } from "redux";
import { CounterReducer } from "./Counter.Reducer"
import { DoctorReducer } from "./DoctorReducer";
import { MedicineReducer } from "./MedicineReducer";
import { PatientsReducer } from "./PatientsReducer";

export const RootReducer = combineReducers({
    counter : CounterReducer,
    medicine: MedicineReducer,
    patient: PatientsReducer,
    doctor: DoctorReducer
})