import {
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,
  REMOVE_PATIENT_REQUEST,
  REMOVE_PATIENT_SUCCESS,
  REMOVE_PATIENT_FAILURE,
} from "./actionTypes"

const initState = {
  isLoading: false,
  added: false,
  removed: false,
}

export const patientReducer = (state = initState, { type, payload }) => {
  switch (type) {
        case ADD_PATIENT_REQUEST:
          return {
              ...state,
              isLoading: true,
            }
            
        case ADD_PATIENT_SUCCESS:
                return {
              ...state,
              isLoading: false,
              added: true,
          }

        case ADD_PATIENT_FAILURE:
          return {
              ...state,
              isLoading: false,
              added: false
          }
        case REMOVE_PATIENT_REQUEST:
          return {
              ...state,
              isLoading: true,
            }
            
        case REMOVE_PATIENT_SUCCESS:
                return {
              ...state,
              isLoading: false,
              removed: true,
          }

        case REMOVE_PATIENT_FAILURE:
          return {
              ...state,
              isLoading: false,
              removed: false
          }
        default:
          return state
  }
}
