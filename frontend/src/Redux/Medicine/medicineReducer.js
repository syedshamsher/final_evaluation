import {
  ADD_MEDICINE_REQUEST,
  ADD_MEDICINE_SUCCESS,
  ADD_MEDICINE_FAILURE,
  REMOVE_MEDICINE_REQUEST,
  REMOVE_MEDICINE_SUCCESS,
  REMOVE_MEDICINE_FAILURE,
} from "./actionTypes"

const initState = {
  isLoading: false,
  added: false,
  removed: false,
}

export const medicineReducer = (state = initState, { type, payload }) => {
  switch (type) {
        case ADD_MEDICINE_REQUEST:
          return {
              ...state,
              isLoading: true,
            }
            
        case ADD_MEDICINE_SUCCESS:
                return {
              ...state,
              isLoading: false,
              added: true,
          }

        case ADD_MEDICINE_FAILURE:
          return {
              ...state,
              isLoading: false,
              added: false
          }
        case REMOVE_MEDICINE_REQUEST:
          return {
              ...state,
              isLoading: true,
            }
            
        case REMOVE_MEDICINE_SUCCESS:
                return {
              ...state,
              isLoading: false,
              removed: true,
          }

        case REMOVE_MEDICINE_FAILURE:
          return {
              ...state,
              isLoading: false,
              removed: false
          }
        default:
          return state
  }
}
