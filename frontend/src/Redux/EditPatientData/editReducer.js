import {
    EDIT_PATIENT_REQUEST,
    EDIT_PATIENT_SUCCESS,
    EDIT_PATIENT_FAILURE,
  } from "./actionTypes"
  
  const initState = {
    isLoading: false,
    added: false,
    removed: false,
  }
  
  export const editPatientReducer = (state = initState, { type, payload }) => {
    switch (type) {
          case EDIT_PATIENT_REQUEST:
            return {
                ...state,
                isLoading: true,
              }
              
          case EDIT_PATIENT_SUCCESS:
                  return {
                ...state,
                isLoading: false,
                added: true,
            }
  
          case EDIT_PATIENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                added: false
            }
          default:
            return state
    }
  }
  