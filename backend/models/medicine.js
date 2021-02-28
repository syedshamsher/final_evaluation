const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  patient_id: {
    type: String,
    required: true
  },
  patient: {
    type: String,
    required: true
  },
  doctor_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
      type: String,
      required: true
  }
}, {
  versionKey: false
})

module.exports = mongoose.model('medicine', medicineSchema);
