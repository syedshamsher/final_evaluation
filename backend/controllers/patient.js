const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const Patient = require('../models/patient');
const dotenv = require('dotenv');

dotenv.config();

const addPatient = (req, res, next)=> {
  
    const doctor_id = req.body.doctor_id
    const doctor = req.body.doctor
    const name=req.body.name
    const gender=req.body.gender
    const age = req.body.age
    const image=req.file.path
    const blood=req.body.blood
    const data = { doctor_id, doctor, name, gender, image, blood, age };
    // console.log( data )
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        res.status(404).send({ error: 'true', msg: errors.errors[0]});
        res.end();
    }
    else {
        const newPatient = new Patient(data)
        newPatient
            .save()
            .then(() => res.status(200).json("Patient's Data Added Successfully"))
            .catch((err) => res.status(400).json("Error :" + err))
    }
}

const editPatient = (req,res)=>{
    const id = req.body._id;
    const doctor_id = req.body.doctor_id
    const doctor = req.body.doctor
    const name=req.body.name
    const gender=req.body.gender
    const age = req.body.age
    const blood=req.body.blood
    const updatedData = { doctor_id, doctor, name, gender, blood, age };
    Patient.updateOne({_id: id}, updatedData )
        .then((update) => {
            if(update) {
                return res.status(200).json("Updated Successfully");
            } else {
                return res.status(404).json("Error while Updating")
            }
        })
        .catch((err) => res.status(404).json("Error:" + err)); 

}

const getPatients = (req, res) => {
    res.json(res.pagination)
};



module.exports = { addPatient, getPatients, editPatient }