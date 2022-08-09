import * as ActionType from '../ActionType'

const initval = {
    error: '',
    medicine: [],
    isLoading: false
}

export const MedicineReducer = (state = initval, action) => {
    console.log(action.payload);
    switch (action.type) {
        case ActionType.MEDICINE_GETDATA:
            return {
                ...state,
                isLoading: false,
                medicine: action.payload,
                error: ''
            }
        case ActionType.MEDICINE_LOADING:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionType.MEDICINE_ERROR:
            return {
                ...state,
                isLoading: false,
                medicine: [],
                error: action.payload
            }
        case ActionType.ADD_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.concat(action.payload),
                error: ''
            }
        case ActionType.DELETE_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.filter((m) => m.id !== action.payload),
                error: ''
            }
            case ActionType.UPDATE_MEDICINE:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.map((m) => {
                    if (m.id === action.payload.id) {
                        return action.payload
                    } else {
                        return m
                    }
                }),
                error: ''
            }
        default:
            return state;
    }
}