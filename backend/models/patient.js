const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  doctor_id: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  blood: {
    type: String,
    required: true
  },
}, {
  versionKey: false
})

module.exports = mongoose.model('patient', patientSchema);
