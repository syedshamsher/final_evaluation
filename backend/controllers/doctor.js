const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Doctor = require('../models/doctor')
const { loginValidation, registerValidation } = require('../validation/validation')

dotenv.config();

//function which authenticates a doctor
const authenticate = async (req, res, next) => {
    // console.log( req.body)
    const email = req.body.email;
    const password = req.body.password;
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
        }
        
    const doctor = await Doctor.findOne({ email: email });
    if (!doctor) {
        return res.status(400).send("Email is not registered");
    }
    
    const validPass = await bcrypt.compare(password, doctor.password);
    if (!validPass) {
        return res.status(400).send("Invalid password");
    }
    
    if( validPass ) {
        const accessToken = jwt.sign({data: doctor._id}, process.env.SECRET_KEY, {
            expiresIn: '1d'
        })
        // console.log("login token sent", accessToken)
        res.status(200).json({token: accessToken})
    } else {
        // console.log( res )
        res.status(400).json({error: 'wrong password'})
    }
}

//function which registers a new doctor
const register = async (req,res) =>{
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password
    
    const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

    const emailExists = await Doctor.findOne({ email: email });
        if (emailExists) {
            return res.status(400).send("Email already exists in the database");
        }

    const hashedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(10)
      );

    const doctor = new Doctor({
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: hashedPassword,
      });

    try {
        const savedDoctor = await doctor.save();
        // console.log( savedDoctor )
        res.send(savedDoctor);
    } 
    catch (err) {
        res.status(400).send(err);
    }
}

//function which fetches active doctor
const getActiveDoctor = (req, res) => {
    Doctor.findOne( {_id: req._id.data} )
        .then((doctor) => res.json(doctor))
        .catch((err) => res.status(400).json("Error " + err))
}

module.exports = { authenticate, register, getActiveDoctor }