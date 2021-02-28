import {
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,
  REMOVE_PATIENT_REQUEST,
  REMOVE_PATIENT_SUCCESS,
  REMOVE_PATIENT_FAILURE,
} from "./actionTypes"
import axios from "axios"

export const addPatientRequest = () => ({
  type: ADD_PATIENT_REQUEST
})

export const addPatientSuccess = () => ({
  type: ADD_PATIENT_SUCCESS,
})

export const addPatientFailure = () => ({
  type: ADD_PATIENT_FAILURE
})
export const removePatientRequest = () => ({
  type: REMOVE_PATIENT_REQUEST
})

export const removePatientSuccess = () => ({
  type: REMOVE_PATIENT_SUCCESS,
})

export const removePatientFailure = () => ({
  type: REMOVE_PATIENT_FAILURE
})

export const addPatient = (formData) => (dispatch) => {
  console.log( formData )
  dispatch(addPatientRequest())
  let config = {
    method: "post",
    url: "http://localhost:5000/api/patient/add",
    headers: {
        "content-Type": "application/json",
    },
    data: formData,
  };
  
    axios(config)
    .then((res) =>
        dispatch(
            addPatientSuccess(res.data)
        )
    )
    .catch((err) => dispatch(addPatientFailure(err.message)))
}
