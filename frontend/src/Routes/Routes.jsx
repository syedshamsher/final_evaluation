import React from 'react'
import { Switch, Route } from "react-router-dom";
import { Navbar } from '../Components/Navbar/Navbar';
import { Home } from '../Pages/Home/Home';
import { Login } from '../Pages/Login/Login';
import { MedicineAdd } from '../Pages/MedicineAdd';
import { PatientDetails } from '../Pages/PatientDetails';
import { Register } from '../Pages/Register';



function Routes() {
    
    return (
        <div>
            <Route path="/" render={() => <Navbar />} />
            <Switch>
                <Route path="/" exact render={() => <Home /> } />
                <Route path="/login" exact render={() => <Login /> } />
                <Route path="/medicine/:id" exact render={() => <MedicineAdd /> } />
                <Route path="/register" exact render={() => <Register /> } />
                <Route path="/patient/:id" exact render={() => <PatientDetails /> } />
            </Switch>
        </div>
    )
}

export { Routes }
