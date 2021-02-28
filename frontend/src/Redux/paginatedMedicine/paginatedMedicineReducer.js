import { loadData, saveData } from "../../Utils/LocalStorage"
import {
    MEDICINE_FEEDS_REQUEST,
    MEDICINE_FEEDS_SUCCESS,
    MEDICINE_FEEDS_FAILURE,
  } from "./actionTypes"
  
  const initState = {
    isLoading: false,
    error: null,
    medicineFeeds: loadData('feeds') || []
  }
  
  export const paginatedMedicineReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case MEDICINE_FEEDS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
  
        case MEDICINE_FEEDS_SUCCESS:
            let data = payload;
            saveData('feeds' ,data)
            return {
                ...state,
                isLoading: false,
                error: null,
                medicineFeeds: data
            }
  
        case MEDICINE_FEEDS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
  }
  