// controllers/studentController.js
const path = require('path');
const studentService = require('../services/studentService');

const uploadStudentAvatar = async (req, res) => {
    try {
      const studentId = req.params.id;
      const avatarPath = path.posix.join('uploads', studentId, req.file.filename); // relative path for frontend
      
      const student = await studentService.uploadStudentAvatar(studentId, avatarPath, req._updatingUser);
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json({
        message: 'Avatar uploaded successfully',
        avatar: avatarPath,
        student
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to upload avatar' });
    }
};

const uploadStudentDocument = async (req, res) => {
    try {
      const studentId = req.params.id;
  
      if (studentId !== req.body.student_id) {
        return res.status(400).json({ message: 'Student ID mismatch' });
      }
      
      // File path
      const documentPath = path.posix.join('uploads', studentId, 'documents', req.file.filename);
  
      // Create a document object as per schema
      const documentData = {
        document_type: req.body.document_type || 'other',
        file_name: req.body.name || req.file.originalname,
        certified: req.body.certified || 'no',
        certified_by: req.body.certified_by || '',
        certified_date: req.body.certified_date || '',
        upload_date: new Date().toISOString(),
        expiry_date: req.body.expiry_date || '',
        file_id: req.file.filename,
        file_src: documentPath,
      };
  
      // Push the document to student's document array
      const student = await studentService.addDocumentToStudent(studentId, documentData, req._updatingUser);
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json({
        message: 'Document uploaded successfully',
        document: documentData,
        student,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to upload document' });
    }
};
  

const getAllStudents = async (req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};

const getStudentById = async (req, res) => {
    console.log(`Fetching student with ID: ${req.params.id}`);
    try {
        const student = await studentService.getStudentById(req.params.id);
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getStudentByStudentId = async (req, res) => {
    try {
        const student = await studentService.getStudentByStudentId(req.params.id);
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createStudent = async (req, res) => {
    try {
        const savedStudent = await studentService.createStudent(req.body);
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: 'Error creating student', error: error.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        await studentService.deleteStudent(req.params.id);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getStudentContactDetails = async (req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({ message: "Student ID is required" });
    }
    try {
        const student = await studentService.getStudentContactDetails(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student.contact_details);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStudentContactDetails = async (req, res) => {
    const { id } = req.params;
    const { contact_details } = req.body;
    if (!Array.isArray(contact_details)) {
      return res.status(400).json({ message: "contact_details must be an array" });
    }
    if(!id){
        return res.status(400).json({ message: "Student ID is required" });
    }
    try {
        const updatedStudent = await studentService.updateStudentContactDetails(id, contact_details, req._updatingUser);

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateStudentAddressDetails = async (req, res) => {
    const { id } = req.params;
    const { address_details } = req.body;
    if (!Array.isArray(address_details)) {
      return res.status(400).json({ message: "address_details must be an array" });
    }
    if(!id){
        return res.status(400).json({ message: "Student ID is required" });
    }
    try {
        const updatedStudent = await studentService.updateStudentAddressDetails(id, address_details, req._updatingUser);
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateEmergencyContactsDetails = async (req, res) => {
    const { id } = req.params;
    const { emergency_contacts } = req.body;
    if (!Array.isArray(emergency_contacts)) {
      return res.status(400).json({ message: "emergency_contacts must be an array" });
    }
    if(!id){
        return res.status(400).json({ message: "Student ID is required" });
    }
    try {
        const updatedStudent = await studentService.updateEmergencyContactsDetails(id, emergency_contacts, req._updatingUser);
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAcademicDetails = async (req, res) => {
    const { id } = req.params;
    const { academic_details } = req.body;
    if (!Array.isArray(academic_details)) {
      return res.status(400).json({ message: "academic_details must be an array" });
    }
    if(!id){
        return res.status(400).json({ message: "Student ID is required" });
    }
    try {
        const updatedStudent = await studentService.updateAcademicDetails(id, academic_details, req._updatingUser);
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTertiaryEducationDetails = async (req, res) => {
    const { id } = req.params;
    const { tertiary_education } = req.body;
    if (!Array.isArray(tertiary_education)) {
      return res.status(400).json({ message: "tertiary_education must be an array" });
    }
    if(!id){
        return res.status(400).json({ message: "Student ID is required" });
    }
    try {
        const updatedStudent = await studentService.updateTertiaryEducationDetails(id, tertiary_education, req._updatingUser);
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateEmploymentHistoryDetails = async (req, res) => {
    const { id } = req.params;
    const { employment_history } = req.body;
    if (!Array.isArray(employment_history)) {
      return res.status(400).json({ message: "employment_history must be an array" });
    }
    if(!id){
        return res.status(400).json({ message: "Student ID is required" });
    }
    try {
        const updatedStudent = await studentService.updateEmploymentHistoryDetails(id, employment_history, req._updatingUser);
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateLanguageProficiencyDetails = async (req, res) => {
    const { id } = req.params;
    const { language_proficiency } = req.body;
    if (!Array.isArray(language_proficiency)) {
      return res.status(400).json({ message: "language_proficiency must be an array" });
    }
    if(!id){
        return res.status(400).json({ message: "Student ID is required" });
    }
    try {
        const updatedStudent = await studentService.updateLanguageProficiencyDetails(id, language_proficiency, req._updatingUser);
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUnsubmittedProgrammes = async (req, res) => {
    const { id } = req.params;
    const { unsubmitted_programmes } = req.body;
    if (!Array.isArray(unsubmitted_programmes)) {
      return res.status(400).json({ message: "unsubmitted_programmes must be an array" });
    }
    if(!id){
        return res.status(400).json({ message: "Student ID is required" });
    }
    try {
        const updatedStudent = await studentService.updateUnsubmittedProgrammes(id, unsubmitted_programmes, req._updatingUser);
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSubmittedProgrammes = async (req, res) => {
  const { id } = req.params;
  const { submitted_programmes } = req.body;

  if (!Array.isArray(submitted_programmes)) {
    return res.status(400).json({ message: "submitted_programmes must be an array" });
  }

  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  try {
    const updatedStudent = await studentService.updateSubmittedProgrammes(id, submitted_programmes, req._updatingUser);
    
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUniversities = async (req, res) => {
    try {
        const universities = await studentService.getUniversities();
        res.status(200).json(universities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadStudentAvatar,
    uploadStudentDocument,

    getAllStudents,
    getStudentById,
    getUniversities,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentByStudentId,
    
    getStudentContactDetails,
    updateStudentContactDetails,

    updateStudentAddressDetails,
    updateEmergencyContactsDetails,
    updateAcademicDetails,
    updateTertiaryEducationDetails,
    updateEmploymentHistoryDetails,
    updateLanguageProficiencyDetails,
    updateUnsubmittedProgrammes,
    updateSubmittedProgrammes
};
