import {
  ADD_MEDICINE_REQUEST,
  ADD_MEDICINE_SUCCESS,
  ADD_MEDICINE_FAILURE,
  REMOVE_MEDICINE_REQUEST,
  REMOVE_MEDICINE_SUCCESS,
  REMOVE_MEDICINE_FAILURE,
} from "./actionTypes"
import axios from "axios"

export const addMedicineRequest = () => ({
  type: ADD_MEDICINE_REQUEST
})

export const addMedicineSuccess = () => ({
  type: ADD_MEDICINE_SUCCESS,
})

export const addMedicineFailure = () => ({
  type: ADD_MEDICINE_FAILURE
})
export const removeMedicineRequest = () => ({
  type: REMOVE_MEDICINE_REQUEST
})

export const removeMedicineSuccess = () => ({
  type: REMOVE_MEDICINE_SUCCESS,
})

export const removeMedicineFailure = () => ({
  type: REMOVE_MEDICINE_FAILURE
})

export const addMedicine = (medicineDetails) => (dispatch) => {
  console.log( medicineDetails )
  dispatch(addMedicineRequest())
  let config = {
    method: "post",
    url: "http://localhost:5000/api/medicine/add",
    headers: {
        "content-Type": "application/json",
    },
    data: medicineDetails,
  };
  
    axios(config)
    .then((res) =>
        dispatch(
            addMedicineSuccess(res.data)
        )
    )
    .catch((err) => dispatch(addMedicineFailure(err.message)))
}
