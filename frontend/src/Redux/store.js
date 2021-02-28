import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { activeDrMedicines } from './ActiveDrMedicines/activeDrMedicines';
import { authReducer } from './Auth/authReducer'
import { medicineReducer } from './Medicine/medicineReducer';
import { paginatedFeedsReducer } from './PaginatedFeeds/paginatedFeedsReducer';
import { paginatedMedicineReducer } from './paginatedMedicine/paginatedMedicineReducer';
import { patientReducer } from './Patient/patientReducer';
import { registerReducer } from './Register/registerReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    patient: patientReducer,
    feeds: paginatedFeedsReducer,
    medicine: medicineReducer,
    prescribedMedicines: activeDrMedicines,
    medicineFeeds: paginatedMedicineReducer
})

export const store = createStore( rootReducer, composeEnhancer(applyMiddleware(thunk)))