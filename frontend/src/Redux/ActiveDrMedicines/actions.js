import { FETCH_MEDICINE_REQUEST, 
         FETCH_MEDICINE_SUCCESS, 
         FETCH_MEDICINE_FAILURE 
} from './actionTypes'
import axios from 'axios';

export const fetchMedicinesRequest = () => ({
    type: FETCH_MEDICINE_REQUEST

})

export const fetchMedicinesSuccess = (payload) => ({
    type: FETCH_MEDICINE_SUCCESS,
    payload
})

export const fetchMedicinesFailure = (payload) => ({
    type: FETCH_MEDICINE_FAILURE,
})

export const fetchMedicines = (patientId) => (dispatch) => {
    dispatch(fetchMedicinesRequest())
    axios.get(`http://localhost:5000/api/medicines/?id=${patientId}`)
        .then((res) => {
            console.log( res )
            dispatch(fetchMedicinesSuccess(res.data))
        })
        .catch((err) => {
            dispatch(fetchMedicinesFailure(err))
        })
}