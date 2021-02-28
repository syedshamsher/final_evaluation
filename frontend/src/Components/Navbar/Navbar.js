import React from 'react';
import {AppBar, Toolbar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import {  NavLink } from 'react-router-dom';
import styles from './style.module.css'
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../../Redux/Auth/actions';

const useStyles = makeStyles(() => ({
  appBar: {
      maxHeight: '40px',
      backgroundColor: 'lightblue',
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      position: 'fixed'
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  homeIcon: {
      color: 'black',
    //   marginBottom: '20px'
  },

}));

export function Navbar() {
  const classes = useStyles();
  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState("")

  const queryHandler = (e) => {
      //handle query
  }

  const handleLogout = () => {
    dispatch( logout() )
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <NavLink to='/' >
                <HomeIcon className={classes.homeIcon} />
          </NavLink>
          {
            !token ?
            <NavLink className={styles.nav} to='/login' activeStyle={{padding: "0 12px 0 12px", backgroundColor: "#d01345",transform: "skew(-18deg)", color: "black"}}>
                  Login
            </NavLink> :
            <NavLink className={styles.nav} to='/logout' activeStyle={{padding: "0 12px 0 12px", backgroundColor: "#d01345",transform: "skew(-18deg)", color: "black"}} onClick={handleLogout}>
                  Logout
            </NavLink>
          }
          { !token &&
            <NavLink className={styles.nav} to='/register' activeStyle={{padding: "0 12px 0 12px", backgroundColor: "#d01345",transform: "skew(-18deg)", color: "black"}}>
                  Register
            </NavLink>
          }
          <input type="text" name="query" value={query} onChange={(e) => setQuery(e.target.value)}  />
          <button className={styles.searchBtn} onClick={queryHandler}>SEARCH</button>
        </Toolbar>
      </AppBar>
        <Toolbar >

        </Toolbar>
    </div>
  );
}
