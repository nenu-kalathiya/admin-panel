import * as ActionType from '../ActionType'

const initval = {
    error: '',
    patient: [],
    isLoading: false
}

export const PatientsReducer = (state = initval, action) => {
    console.log(action.payload);
    switch (action.type) {
        case ActionType.PATIENT_GETDATA:
            return {
                ...state,
                isLoading: false,
                patient: action.payload,
                error: ''
            }
        case ActionType.PATIENT_LOADING:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionType.PATIENT_ERROR:
            return {
                ...state,
                isLoading: false,
                patient: [],
                error: action.payload
            }
        case ActionType.ADD_PATIENT:
            return {
                ...state,
                isLoading: false,
                patient: state.patient.concat(action.payload),
                error: ''
            }
        case ActionType.DELETE_PATIENT:
            return {
                ...state,
                isLoading: false,
                patient: state.patient.filter((m) => m.id !== action.payload),
                error: ''
            }
            case ActionType.UPDATE_PATIENT:
            return {
                ...state,
                isLoading: false,
                patient: state.patient.map((m) => {
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