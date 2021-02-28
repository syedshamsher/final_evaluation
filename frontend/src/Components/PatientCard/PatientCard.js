import { Avatar, Box, Card, Typography, CardContent, Button } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';



const useStyles = makeStyles ({
    userCard: {
        width: '350px',
        height: '400px',
        borderRadius: '10px',
        boxShadow: '1px 2px 8px black',
        margin: '10px',
        color: 'black',
        background: '"#dddddd"',
          '&:hover': {
            background: '#ddd',
          }
      },
    userCardTop: {
        height: '52%',
        display: 'flex',
        justifyContent: 'center',
        // width: '100%',
        overflow: 'hidden',
        textAlign: 'center',
        flexDirection: 'row',

      },
    UserCardBottom: {
        // color: 'black',
        minHeight: '40%',
        overflow: 'auto',
        minWidth: '100%',
        maxWidth: '100%',
        padding: '0 10px 5px',
        overflowWrap: 'break-word'
      },
      title: {
        color: "black",
            '&:hover': {
                color: 'white'
            },
      },
      city: {
          fontSize: 15,
        color: 'black',
            '&:hover': {
                color: 'white'
            },
        
      },
      blood: {
          fontSize: 15,
        color: 'black',
            '&:hover': {
                color: 'white'
            },
        
      },
      gender: {
          fontSize: 15,
        color: 'black',
            '&:hover': {
                color: 'white'
            },
      },
      avatar: {
        width: '120px',
        height: '120px',
        margin: '8px 0 0 0',
        borderRadius: '50%',
        border: '4px solid white',
        objectFit: 'cover'
      },
      box: {
        margin: 5
      },
      margin: {
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      },
      paper: {
          minWidth: '400px',
          minHeight: '400px'
      },
      paper1: {
          minWidth: '500px',
          minHeight: '100px',
          padding: '20px'
      },
      btn: {
            minWidth: "100px",
            margin: 10
      }
  });


export const PatientCard = ({patient}) => {
    const history = useHistory();
    // console.log(history)
    let classes = useStyles();

    
    const getImageName = ( url ) => {
        if(patient.image) {
          let imgUrl = url.split("\\")
          return imgUrl[imgUrl.length-1]
        }
      }

    const showPatientDetails = () => {
        const payload = {
            pathname:  `./patient/${patient._id}`,
            state: {patient}
        }
        history.push(payload)
    }


    const handleAddMedicine = () => {
        const payload = {
            pathname:  `./medicine/${patient._id}`,
            state: {patient}
        }
        history.push(payload)
    }

    return (
        <div style={{}}>
            <Card className={classes.userCard}>
                <CardContent >
                    <Box className={classes.userCardTop}>
                        <Avatar alt="profileImg" src={`./uploads/${getImageName(patient.image)}`} className={classes.avatar} />
                    </Box>
                    <Box className={classes.userCardBottom}>
                        <Typography variant="h5"  className={classes.title} >
                            {patient.name}
                        </Typography>
                        <Typography variant="h6"  className={classes.blood} >
                            Blood: {patient.blood}
                        </Typography>
                        <Typography variant="h6"  className={classes.gender} >
                            Gender : {patient.gender}
                        </Typography>
                        <Typography variant="h6"  className={classes.gender} >
                            Age : {patient.age}
                        </Typography>
                    </Box>
                  <Box className={classes.box}>
                    <Button className={classes.btn} color="secondary" variant="outlined" onClick={() => showPatientDetails()} >EDIT PATIENT DETAILS</Button>
                    <Button className={classes.btn} color="primary" variant="outlined"  onClick={() =>handleAddMedicine()}>ADD MEDICINES</Button>
                  </Box>
                </CardContent>
              </Card>
        </div>
    )
}
