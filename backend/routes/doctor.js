const express = require("express");
const multer = require('multer');
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const {  
         register, 
         authenticate,
         getActiveDoctor,
          } = require('../controllers/doctor')
const { addPatient, editPatient, getPatients } = require('../controllers/patient');
const { addMedicine, editMedicine, getMedicines } = require('../controllers/medicine');
const { authenticateToken } = require('../middlewares/authenticate')
const paginatedResults = require('../middlewares/paginatedResults')
const Patient = require('../models/patient');

const router = express.Router();

//image upload func

var uniqueId = uuidv4()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../frontend/public/uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, uniqueId  + file.originalname);
    },
});
  
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});


//fetch all patients with paginatedResults
router.get('/', paginatedResults(Patient), getPatients)

router.get('/medicines', getMedicines )

router.post('/register', register)

router.post('/login', authenticate)

router.get('/doctor', authenticateToken, getActiveDoctor)

//post new patient data
router.post('/patient/add', upload.single("image") ,addPatient);

//post new medicine data
router.post('/medicine/add',addMedicine);

//edit patient details
router.post('/patient/edit', upload.single("image"), editPatient);


module.exports = router