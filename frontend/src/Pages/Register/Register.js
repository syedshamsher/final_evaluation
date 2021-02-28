import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { registerDoctor } from '../../Redux/Register/actions'
import styled from "styled-components"
import styles from './style.module.css'
import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from "@material-ui/core"

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

export const Register = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = React.useState("")
    const [firstname, setFirstName] = React.useState("")
    const [lastname, setLastName] = React.useState("")
    const [regPassword, setRegPassword] = React.useState("")
    const isRegister = useSelector((state) => state.register.isRegister)
    const regError = useSelector((state) => state.register.error)
    const regIsLoading = useSelector((state) => state.register.isLoading)
    const token = useSelector((state) => state.auth.token)

    const handleRegSubmit = (e) => {
        e.preventDefault();
        const doctorDetail = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: regPassword
        }
        dispatch(registerDoctor(doctorDetail))
        setFirstName("")
        setLastName("")
        setEmail("")
        setRegPassword("")
    }

    return (
         <div className={styles.wrapper}>
         {
             !token ?
         <div className={styles.login}>
             <div className={styles.typeHeader}>
                 <div className={styles.loginBtn}>
                      Doctor Register
                 </div>
             </div>
             {    
                 (<form onSubmit={handleRegSubmit} className={styles.form}>
                    <div className={styles.inputWrapper}>
                        <div>
                            EMAIL ADDRESS:
                        </div>
                        <Input
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <br />
                    <div className={styles.inputWrapper}>
                        <div>
                            FIRST NAME:
                        </div>
                        <Input
                            name="firstname"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <br />
                    <div className={styles.inputWrapper}>
                        <div>
                            LAST NAME:
                        </div>
                        <Input
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <br />
                    <div className={styles.inputWrapper}>
                        <div>
                            PASSWORD:
                        </div>
                        <Input
                            name="regPassword"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                        />
                    </div>
                    <br />
                    <div className={styles.inputWrapper}>
                        <Button type="submit" > 
                            { regIsLoading && <CircularProgress size={20} color="inherit" /> }
                            { !regIsLoading && 'JOIN'}
                        </Button>
                    </div>
                    { isRegister && <Alert variant="filled" severity="success">
                                            Successfully registered
                                    </Alert>}
                    {!regIsLoading && regError && (
                        <Alert variant="filled" severity="error" style={{height: '18px', display: 'flex', alignItems: 'center', fontSize:13}}>
                             {regError.data}
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
