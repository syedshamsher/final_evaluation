const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const Medicine = require('../models/medicine');
const dotenv = require('dotenv');

dotenv.config();

const addMedicine = (req, res, next)=> {
    const doctor_id = req.body.doctor_id;
    const patient_id = req.body.patient_id
    const patient = req.body.patient
    const name=req.body.name
    const quantity=req.body.quantity
 
    const data = { patient_id, patient,doctor_id, name, quantity };
    console.log( req.body )
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        res.status(404).send({ error: 'true', msg: errors.errors[0]});
        res.end();
    }
    else {
        const newMedicine = new Medicine(data)
        newMedicine
            .save()
            .then(() => res.status(200).json("Medicine's Data Added Successfully"))
            .catch((err) => res.status(400).json("Error :" + err))
    }
}

const editMedicine = (req,res)=>{
    const id = req.body._id;
    const patient_id = req.body.patient_id
    const patient = req.body.patient
    const name=req.body.name
    const quantity=req.body.quantity
 
    const updatedData = { patient_id, patient, name, quantity };
    Medicine.updateOne({_id: id}, updatedData )
        .then((update) => {
            if(update) {
                return res.status(200).json("Updated Successfully");
            } else {
                return res.status(404).json("Error while Updating")
            }
        })
        .catch((err) => res.status(404).json("Error:" + err)); 

}

const getMedicines = (req, res) => {
    let id = req.query.id
    Medicine.find({patient_id: id})
        .then((medicine) => res.json(medicine))
        .catch((err) => res.status(400).json("Error " + err))
}


module.exports = { addMedicine, getMedicines, editMedicine }