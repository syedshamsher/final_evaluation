import React from 'react'
import { useHistory } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { editPatient } from '../../Redux/EditPatientData/actions';
import { fetchMedicines } from '../../Redux/ActiveDrMedicines/actions';
import axios from 'axios';

const useStyles = makeStyles ({
      margin: {
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '50%',
        border: '1px solid lightblue'
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
export const PatientDetails = () => {
    const history = useHistory();
    const { current } = useSelector(state => state.feeds.feeds)
    const activeDoctor = useSelector(state => state.auth.activeUser)
    const medicines = useSelector(state => state.prescribedMedicines.prescribedMedicines)
    const [ name, setName ] = React.useState('');
    const [ gender, setGender ] = React.useState('');
    const [ blood, setBlood ] = React.useState('');
    const [age, setAge] = React.useState();
    const [ data, setData] = React.useState()
    let arr = history.location.pathname.split("/")
    let patientId = arr[arr.length - 1]
    

    const classes = useStyles();
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        let patient = current?.filter(item => item._id === patientId );
        // console.log(patient);
        setData(patient[0])
        setName(patient[0].name);
        setGender( patient[0].gender);
        setBlood( patient[0].blood);
        setAge( patient[0].age);
        dispatch(fetchMedicines())
    },[current])
    
    console.log( medicines )

    const handleEdit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        formData.get('name');
        formData.get('city');
        formData.get('gender');
        formData.get('blood');
        formData.get('age');
        formData.append('_id', data._id)
        formData.append('doctor_id', activeDoctor._id);
        formData.append('doctor', activeDoctor.first_name + " " + activeDoctor.last_name);
        
        dispatch( editPatient(formData))
        dispatch(fetchMedicines())
        alert("Edited")
        goBack()
    }

    const goBack = () => {
        window.history.back();
    }

    
    return (
        <div style={{display: 'flex'}}>
        
            <form className={classes.margin} onSubmit={handleEdit} method="post" encType="multipart/form-data" >
                <Box className={classes.box}>
                    <TextField
                    name="name"
                    value={name}
                    color="secondary"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    label="Name"
                    />
                </Box>
                <Box className={classes.box}>
                    <TextField
                    color="primary"
                    name="age"
                    value={age}
                    type="number"
                    onChange={(e) => setAge(e.target.value)}
                    variant="outlined"
                    label="age"
                    />
                </Box>
                <Box className={classes.box}>
                    <TextField
                    color="secondary"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    variant="outlined"
                    label="Gender"
                    />
                </Box>
                <Box className={classes.box}>
                    <TextField
                    color="secondary"
                    name="blood"
                    value={blood}
                    onChange={(e) => setBlood(e.target.value)}
                    variant="outlined"
                    label="Blood"
                    />
                </Box>
                <Box className={classes.box} style={{display: "flex", justifyContent: "space-evenly", margin: 10}}>
                    <Button type = "submit" variant="contained" color="secondary">
                        EDIT
                    </Button>
                    <Button onClick={() => goBack()} variant="contained" color="primary">
                        BACK
                    </Button>
                </Box>
            </form>
           
        </div>
    )
}
