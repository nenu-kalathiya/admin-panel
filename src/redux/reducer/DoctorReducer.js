import * as ActionType from '../ActionType'

const initval = {
    error: '',
    doctor: [],
    isLoading: false
}

export const DoctorReducer = (state = initval, action) => {
    console.log(action.payload);
    switch (action.type) {
        case ActionType.DOCTOR_GETDATA:
            return {
                ...state,
                isLoading: false,
                doctor: action.payload,
                error: ''
            }
        case ActionType.DOCTOR_LOADING:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case ActionType.DOCTOR_ERROR:
            return {
                ...state,
                isLoading: false,
                doctor: [],
                error: action.payload
            }
        case ActionType.ADD_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: state.doctor.concat(action.payload),
                error: ''
            }
        case ActionType.DELETE_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: state.doctor.filter((m) => m.id !== action.payload),
                error: ''
            }
            case ActionType.UPDATE_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: state.doctor.map((m) => {
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