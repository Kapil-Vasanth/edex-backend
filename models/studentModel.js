const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  university: String,
  first_name: String,
  last_name: String,
  full_name: String,
  citizenship: String,
  country: String,
  email: String,
  phone: String,
  passport: String,
  passport_expiry: String,
  ielts: String,
  status: String,
  dob: String,
  gender: String,
  score: String,
  remarks: String,
  program: String,
  date_of_visa: String,
  avatar: String,
  date_of_form_filed: String,
  offer_of_place: String,
  funds_loan: String,
  funds_direct_deposit: String,
  
  sop: String,

  contact_details: [{
    contact_type: String,
    name: String,
    description: String
  }],

  address_details: [{
    address_type: String,
    description: String
  }],

  emergency_contacts: [{
    name: String,
    relationship: String,
    phone_number: String
  }],

  unsubmitted_programmes: [{
    id: String,
    programme: String,
    pathway: String,
    year: String,
    intake: String,
    managed_by: String,
    priority: String
  }],

  submitted_programmes: [{
    id: String,
    programme: String,
    pathway: String,
    year: String,
    intake: String,
    managed_by: String,
    status: String,
    explanation: String,
    action_required: String,
    priority: String
  }],

  academic_details: [{
    school: String,
    qualification: String,
    country: String,
    period: String
  }],

  tertiary_education: [{
    institution: String,
    qualification: String,
    country: String,
    period: String,
    completed: Boolean,
    awaiting_results: Boolean
  }],

  employment_history: [{
    employer: String,
    period: String,
    position: String,
    nature_of_work: String
  }],

  language_proficiency: [{
    language: String,
    reading: String,
    writing: String,
    speaking: String,
    listening: String,
    overall: String,
    description: String,
    yes_no: String
  }],

  documents: [{
    document_type: String,
    file_name: String,
    file_id: String,
    file_src: String,
    comment: String,
    certified: String,
    certified_by: String,
    certified_date: String,
    upload_date: String,
    expiry_date: String,
  }]
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
