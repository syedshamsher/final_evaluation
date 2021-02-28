import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../Redux/Auth/actions"
import styles from './style.module.css'
import styled from "styled-components"
import { Redirect } from "react-router-dom"
import { useHistory } from 'react-router-dom';
import { CircularProgress } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';

const Input = styled.input`
  font-size: 18px;
  width: 60%;
  height: 30px;
  margin: 1px;
  background: white;
  border: 0.1px solid black;
  ::placeholder {
    color: grey;
  }
`;

const Button = styled.button`
    width: 42%;
    height: 30px;
    margin: 1px;
    font-size: 16px;
    letter-spacing: .2rem;
    font-weight: bolder;
    outline: none;
    border: none;
    color: whitesmoke;
    background-color: black;
`

const Login = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.auth.isLoading)
    const error = useSelector((state) => state.auth.error)
    const token = useSelector((state) => state.auth.token)
    const [loginEmail, setLoginEmail] = React.useState("")
    const [loginPassword, setLoginPassword] = React.useState("")

    const history = useHistory()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const loginDetails = {
            "email": loginEmail,
            "password": loginPassword
        }
        await dispatch(loginUser(JSON.stringify(loginDetails)))
        setLoginEmail("")
        setLoginPassword("")
        token && history.push(`./`)
    }

    return (
        <div className={styles.wrapper}>
            {
                !token ?
            <div className={styles.login}>
                <div className={styles.typeHeader}>
                    <div className={styles.loginBtn}>
                        Doctor Login
                    </div>
                </div>
                {    
                    (<form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <div>
                                Email:
                            </div>
                            <Input
                                name="loginEmail"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className={styles.inputWrapper}>
                            <div>
                                Password:
                            </div>
                            <Input
                                name="loginPassword"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className={styles.inputWrapper}>
                            <Button type="submit" >
                                { isLoading && <CircularProgress size={20} color="inherit" /> }
                                { !isLoading && 'SUBMIT'}
                            </Button>
                        </div>
                            {!isLoading && error && (
                                <Alert variant="filled" severity="error" style={{height: '18px', display: 'flex', alignItems: 'center', fontSize:13}}>
                                    {error.data}
                                </Alert>
                            )}
                    </form>)
                }
            </div> : 
            <Redirect to='/' />
            }
        </div>
    )
}

export  {Login}
