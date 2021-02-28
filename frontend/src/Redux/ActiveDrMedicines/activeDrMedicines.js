import {
    FETCH_MEDICINE_REQUEST,
    FETCH_MEDICINE_SUCCESS,
    FETCH_MEDICINE_FAILURE,
  } from "./actionTypes"
  
  const initState = {
    isLoading: false,
    error: null,
    prescribedMedicines: []
  }
  
  export const activeDrMedicines = (state = initState, { type, payload }) => {
    switch (type) {
        case FETCH_MEDICINE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
  
        case FETCH_MEDICINE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                prescribedMedicines: payload
            }
  
        case FETCH_MEDICINE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload,
                prescribedMedicines: null
            }
        default:
            return state
    }
  }
  