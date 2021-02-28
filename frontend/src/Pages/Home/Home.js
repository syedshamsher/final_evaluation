import { Box, Button, Card,Backdrop, Container, Fade, TextField, Dialog, Select, InputLabel } from '@material-ui/core';
import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { getActiveUser } from '../../Redux/Auth/actions';
import { makeStyles } from '@material-ui/core/styles';
import { addPatient } from '../../Redux/Patient/actions';
import { PatientCard } from '../../Components/PatientCard/PatientCard';
import { getfeeds } from '../../Redux/PaginatedFeeds/actions';

const useStyles = makeStyles ({
  gridContainer: {
    maxWidth: "80%",
    paddingLeft: '30px',
  },
  innerGrid: {
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
  }
});

export const Home = () => {
  const dispatch = useDispatch()
  const activeDoctor = useSelector(state => state.auth.activeUser)
  const {totalPages, current} = useSelector(state => state.feeds.feeds)
  const [ open, setOpen ] = React.useState(false);
  const [ name, setName ] = React.useState('');
  const [ gender, setGender ] = React.useState('');
  const [ image, setImage ] = React.useState('');
  const [ blood, setBlood ] = React.useState('');
  const [age, setAge] = React.useState();
  const [currPage, setCurrPage] = React.useState(1);
  const [sort, setSort] = React.useState("");
  let classes = useStyles();
  const limit = 3;
  let doctorId = activeDoctor._id

  React.useEffect(() => {
      dispatch(getActiveUser())
      dispatch(getfeeds(currPage, limit, doctorId, sort))
      // getPaginatedData()
  },[currPage,open,dispatch,doctorId, sort])

  const handleClose = () => {
    setOpen(false);
  }
  const handleOpen = () => {
      setOpen(true);
  }

  const handleChange = (e) => {
    setSort(e.target.value)
    // dispatch(getfeeds(currPage, limit, doctorId, sort))
  }

  const handleAdd = (e) => {
    e.preventDefault()
        const formData = new FormData(e.target);
        formData.get('name');
        formData.get('gender');
        formData.get('blood');
        formData.get('age');
        formData.append('image', image);
        formData.append('doctor_id', activeDoctor._id);
        formData.append('doctor', activeDoctor.first_name + " " + activeDoctor.last_name);

        if( !name || !gender || !image || !blood || !age ) {
          return( alert("fill in alll details"))
        }
    
    dispatch(addPatient(formData))
    dispatch(getfeeds(currPage, limit, doctorId, sort))
    handleClose()
}

          return (
            <Container >
              <div>
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                      <button onClick={handleOpen} style={{padding: '10px', outline: 'none', border: '1px solid lightblue', fontWeight: 'bold'}}>ADD NEW PATIENT</button>
                      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                        <InputLabel shrink style={{fontSize: '20px'}}>
                          Sort by Age : 
                        </InputLabel>
                        <Select
                              name="sort"
                              value={sort}
                              onChange={(e) => handleChange(e)}
                              displayEmpty
                              >
                              <option style={{cursor: 'pointer'}} value="" >  Select </option>
                              <option style={{cursor: 'pointer'}} value= "asc" > asc </option>
                              <option style={{cursor: 'pointer'}} value= "desc" > desc </option>
                        </Select>
                      </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Pagination count={totalPages} variant="outlined" shape="rounded" color="secondary" page={currPage} onChange={(e, p) => setCurrPage(p)} />
                    </div>
                    <Dialog
                        classes={{ paper: classes.paper}}
                        open={open}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                          >
                        <Fade in={open}>
                        <form className={classes.margin} onSubmit={handleAdd} method="post" encType="multipart/form-data" >
                            <Box className={classes.margin}>
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
                            <Box className={classes.margin}>
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
                            <Box className={classes.margin}>
                                <TextField
                                color="secondary"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                variant="outlined"
                                label="Gender"
                                />
                            </Box>
                            <Box className={classes.margin}>
                                <TextField
                                color="secondary"
                                name="blood"
                                value={blood}
                                onChange={(e) => setBlood(e.target.value)}
                                variant="outlined"
                                label="Blood"
                                />
                            </Box>
                            <Box className={classes.margin}>
                                <TextField
                                color="secondary"
                                type="file"
                                name="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                variant="outlined"
                                />
                            </Box>
                            <Box style={{display: "flex", justifyContent: "space-evenly", margin: 10}}>
                                <Button type = "submit" variant="contained" color="secondary">
                                    ADD
                                </Button>
                                <Button onClick={handleClose} variant="contained" color="primary">
                                    CLOSE
                                </Button>
                            </Box>
                        </form>
                        </Fade>
                      </Dialog>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
                  {
                    current?.map((item) => {
                      return(
                        <div  key={item._id}>
                            <PatientCard patient={item}  />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </Container>
          );
}