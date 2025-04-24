// services/studentService.js

const Student = require('../models/studentModel');

const getAllStudents = async () => {
    return await Student.find();
};

const getStudentById = async (id) => {
    const student = await Student.findById(id);
    if (!student) throw new Error('Student not found');
    return student;
};

const getStudentByStudentId = async (studentId) => {
    const student = await Student.findOne({ student_id: studentId });
    if (!student) throw new Error('Student not found');
    return student;
}

const createStudent = async (data) => {
    const newStudent = new Student(data);
    return await newStudent.save();
};

const updateStudent = async (id, data) => {
    const updatedStudent = await Student.findByIdAndUpdate(id, data, { new: true });
    if (!updatedStudent) throw new Error('Student not found');
    return updatedStudent;
};

const deleteStudent = async (id) => {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) throw new Error('Student not found');
    return deletedStudent;
};


const updateStudentContactDetails = async (id, contactDetails) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { contact_details: contactDetails } },
        { new: true }
    );
    console.log(updatedStudent)
    if (!updatedStudent) throw new Error('Student not found');
    return updatedStudent;
};

const updateStudentAddressDetails = async (id, addressDetails) => {
    console.log('Address details to update:', addressDetails); // Log the input to check the structure
    
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { address_details: addressDetails } },
        { new: true }
    );
    
    console.log('Updated student after update operation:', updatedStudent); // Log the returned updated student
    
    if (!updatedStudent) {
        console.log(`Student with id ${id} not found`);
        throw new Error('Student not found');
    }
    
    return updatedStudent;
};

const updateEmergencyContactsDetails = async (id, emergencyContactsDetails) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { emergency_contacts: emergencyContactsDetails } },
        { new: true }
    );
    if (!updatedStudent) throw new Error('Student not found');
    return updatedStudent;
}



  
  
  

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentByStudentId,
    updateStudentContactDetails,
    updateStudentAddressDetails,
    updateEmergencyContactsDetails
};
