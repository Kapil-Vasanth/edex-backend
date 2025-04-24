// controllers/studentController.js

const studentService = require('../services/studentService');

const getAllStudents = async (req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};

const getStudentById = async (req, res) => {
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
        
        const updatedStudent = await studentService.updateStudentContactDetails(id, contact_details);

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
        const updatedStudent = await studentService.updateStudentAddressDetails(id, address_details);
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
        const updatedStudent = await studentService.updateEmergencyContactsDetails(id, emergency_contacts);
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentByStudentId,
    
    getStudentContactDetails,
    updateStudentContactDetails,

    updateStudentAddressDetails,

    updateEmergencyContactsDetails
};
