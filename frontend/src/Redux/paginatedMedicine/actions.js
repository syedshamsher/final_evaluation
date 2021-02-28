import { MEDICINE_FEEDS_REQUEST, 
         MEDICINE_FEEDS_SUCCESS, 
         MEDICINE_FEEDS_FAILURE 
} from './actionTypes'
import axios from 'axios';

export const medicineFeedsRequest = () => ({
    type: MEDICINE_FEEDS_REQUEST

})

export const medicineFeedsSuccess = (payload) => ({
    type: MEDICINE_FEEDS_SUCCESS,
    payload
})

export const medicineFeedsFailure = (payload) => ({
    type: MEDICINE_FEEDS_FAILURE,
})

export const getMedicinefeeds = (currPage, limit, doctorId, sort) => (dispatch) => {
    console.log( doctorId)
    dispatch(medicineFeedsRequest())
     
    axios.get(`http://localhost:5000/api/medicine/?id=${doctorId}&page=${currPage}&limit=${limit}&sort=${sort}`)
        .then((res) => {
            dispatch(medicineFeedsSuccess(res.data))
        })
        .catch((err) => {
            dispatch(medicineFeedsFailure(err))
        })
}