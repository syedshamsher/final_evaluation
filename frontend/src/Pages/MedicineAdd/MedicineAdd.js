import React from 'react'
import { useHistory } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import { Box, Button, Fade, TextField, Backdrop, Dialog, Container, Input, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { editPatient } from '../../Redux/EditPatientData/actions';
import { addMedicine } from '../../Redux/Medicine/actions';
import { fetchMedicines } from '../../Redux/ActiveDrMedicines/actions';
import axios from 'axios';

const useStyles = makeStyles ({
      margin: {
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '20%',
        border: '1px solid black'
      },
      box: {
          margin: "10px !important",
          width: "100%",
      },
      medicinesContainer: {
          display: 'flex',
          justifyContent: 'space-evenly',
        //   alignItems: 'center',
      }
  });
export const MedicineAdd = () => {
    const history = useHistory();
    const { current } = useSelector(state => state.feeds.feeds)
    const loading = useSelector(state => state.medicine.isLoading)
    const { prescribedMedicines } = useSelector(state => state.prescribedMedicines)
    const [ data, setData] = React.useState()
    const [medicineName, setMedicineName ] = React.useState("")
    const [quantity, setQuantity] = React.useState("")
    
    let details = history.location.state.patient
    let arr = history.location.pathname.split("/")
    let patientId = arr[arr.length - 1]
    const classes = useStyles();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchMedicines(patientId))
    },[current, dispatch, loading])
    
    const handleAddMedicine = () => {
        let medicineDetails = {
            patient_id: patientId,
            patient: details.name,
            doctor_id: details.doctor_id,
            name: medicineName,
            quantity: quantity
        }
        dispatch(addMedicine(medicineDetails))
    }
    
    return (
        <div style={{display: 'flex'}}>
            <div style={{display: "flex",flexDirection:"column", flex: 3}} >
                <Container className={classes.medicinesContainer} method="post" >
                    <Box>
                        <TextField 
                            variant="outlined"
                            color= "primary"
                            name= "medicineName"
                            value={medicineName}
                            label="Enter Medicine Name"
                            onChange={(e) => setMedicineName(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <TextField
                            color="primary"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            variant="outlined"
                            label="Enter Medicine Quantity"
                        />
                    </Box>
                    <Box>
                        <Button color="primary" variant="contained" onClick={() => handleAddMedicine()}>ADD MEDICINE</Button>
                    </Box>
                </Container>
                <Container style={{marginTop: '50px'}}>
                    {
                        prescribedMedicines?.map((item) => {
                            return(
                                <div style={{display: 'flex', textAlign:'left', width:'65%', justifyContent: 'space-evenly', alignItems: 'center', margin:'10px', background:"#3333"}} >
                                    <h2 style={{textAlign: 'left', flex:"2", margin:'20px'}}>Medicine Name : {item.name} </h2>
                                    <div>
                                        <h4 style={{textAlign: 'left', margin:'20px'}}>Quantity :  {item.quantity} </h4>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Container>
            </div>
        </div>
    )
}
