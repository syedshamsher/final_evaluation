import { FEEDS_REQUEST, 
         FEEDS_SUCCESS, 
         FEEDS_FAILURE 
} from './actionTypes'
import axios from 'axios';

export const feedsRequest = () => ({
    type: FEEDS_REQUEST

})

export const feedsSuccess = (payload) => ({
    type: FEEDS_SUCCESS,
    payload
})

export const feedsFailure = (payload) => ({
    type: FEEDS_FAILURE,
})

export const getfeeds = (currPage, limit, doctorId, sort) => (dispatch) => {
    console.log( doctorId)
    dispatch(feedsRequest())
     
    axios.get(`http://localhost:5000/api/?id=${doctorId}&page=${currPage}&limit=${limit}&sort=${sort}`)
        .then((res) => {
            dispatch(feedsSuccess(res.data))
        })
        .catch((err) => {
            dispatch(feedsFailure(err))
        })
}