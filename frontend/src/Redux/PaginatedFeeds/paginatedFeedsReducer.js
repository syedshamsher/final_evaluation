import { loadData, saveData } from "../../Utils/LocalStorage"
import {
    FEEDS_REQUEST,
    FEEDS_SUCCESS,
    FEEDS_FAILURE,
  } from "./actionTypes"
  
  const initState = {
    isLoading: false,
    error: null,
    feeds: loadData('feeds') || []
  }
  
  export const paginatedFeedsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case FEEDS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
  
        case FEEDS_SUCCESS:
            let data = payload;
            saveData('feeds' ,data)
            return {
                ...state,
                isLoading: false,
                error: null,
                feeds: data
            }
  
        case FEEDS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
  }
  