const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
{
  type: {
    type: String,
    required: true
  },

  // Common Fields
date: String,
uhid: String,
patientName: String,
name: String,
age: Number,
gender: String,
mobile: String,     
contact: String,
contactNo: String,
email: String,

  // Doctor Info

  doctorName: String,
  consultantName: String,

  // IPD Fields

  ipNo: String,
  bedCategory: String,
  bedNo: String,
  admissionDate: String,
  dischargeDate: String,

  // OPD Ratings and general

  ratings: {
  // OPD

  appointment: String,
  registration: String,
  doctor: String,
  laboratory: String,
  radiology: String,
  pharmacy: String,
  housekeeping: String,
  parking: String,
  recommend: String,
  valueMoney: String,

  // GENERAL

  cleanliness: Number,
  staffBehaviour: Number,
  environment: Number,
  overallExperience: Number,
},
  // General Feedback

  feedback: String,
  comment: String,
  suggestion: String,

  // IPD Extra Ratings

  reasonScore: [String],
  hospitalChoice: [String],

  recommendStar: Number,
  admissionExperience: Number,
  doctorExperience: Number,
  nursingCare: Number,
  physiotherapy: Number,
  housekeepingService: Number,
  foodBeverages: Number,
  billingProcess: Number,
  attendantExperience: Number,
  emergency: Number,
  icu: Number,
  ot: Number,
  ambulance: Number,

  staffMention: String,
  inconvenience: String,

},
{
  timestamps: true
}
);

module.exports = mongoose.model(
  "Feedback",
  feedbackSchema
);