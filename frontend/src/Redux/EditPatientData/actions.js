import {
    EDIT_PATIENT_REQUEST,
    EDIT_PATIENT_SUCCESS,
    EDIT_PATIENT_FAILURE,
  } from "./actionTypes"
  import axios from "axios"
  
  export const editPatientRequest = () => ({
    type: EDIT_PATIENT_REQUEST
  })
  
  export const editPatientSuccess = () => ({
    type: EDIT_PATIENT_SUCCESS,
  })
  
  export const editPatientFailure = () => ({
    type: EDIT_PATIENT_FAILURE
  })
  
  export const editPatient = (formData) => (dispatch) => {
    console.log( formData )
    dispatch(editPatientRequest())
    let config = {
      method: "post",
      url: "http://localhost:5000/api/patient/edit",
      headers: {
          "content-Type": "application/json",
          "content-type": "multipart/form-data"
      },
      data: formData,
    };
    
      axios(config)
      .then((res) =>
          dispatch(
              editPatientSuccess(res.data)
          )
      )
      .catch((err) => dispatch(editPatientFailure(err.message)))
  }
  