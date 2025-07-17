// services/studentService.js

const Student = require('../models/studentModel');

const getAllStudents = async () => {
    return await Student.find();
};

const getStudentById = async (id) => {
    const student = await Student.findById(id).select('-password');
    if (!student) throw new Error('Student not found');
    return student;
};

const getStudentByStudentId = async (studentId) => {
    const student = await Student.findOne({ student_id: studentId }).select('-password');
    if (!student) throw new Error('Student not found');
    return student;
}

const createStudent = async (data) => {
    const newStudent = new Student(data);
    return await newStudent.save();
};

const updateStudent = async (id, data) => {
    const { avatar, password, student_id, ...updateData } = data; // Exclude the avatar field from the update
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedStudent) throw new Error('Student not found');
    return updatedStudent;
};

const deleteStudent = async (id) => {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) throw new Error('Student not found');
    return deletedStudent;
};

const getUniversities = async () => {
    // get from all the student universities
    const students = await Student.find().select('university');
    return students.map(student => student.university);
};

const updateStudentContactDetails = async (id, contactDetails,lastUpdatedBy) => {
    console.log('lastUpdatedBy:', lastUpdatedBy);
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { contact_details : contactDetails, last_updated_by: lastUpdatedBy } },
        { new: true }
    );
    if (!updatedStudent) throw new Error('Student not found');
    return updatedStudent;
};

const updateStudentAddressDetails = async (id, addressDetails, lastUpdatedBy) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { address_details: addressDetails, last_updated_by: lastUpdatedBy } },
        { new: true }
    );
    
    if (!updatedStudent) {
        console.log(`Student with id ${id} not found`);
        throw new Error('Student not found');
    }
    
    return updatedStudent;
};

const updateEmergencyContactsDetails = async (id, emergencyContactsDetails, lastUpdatedBy) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { emergency_contacts: emergencyContactsDetails, last_updated_by: lastUpdatedBy } },
        { new: true }
    );
    if (!updatedStudent) throw new Error('Student not found');
    return updatedStudent;
}

const updateAcademicDetails = async (id, academicDetails, lastUpdatedBy) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { academic_details: academicDetails, last_updated_by: lastUpdatedBy } },
        { new: true }
    );
    if (!updatedStudent) throw new Error('Student not found');
    return updatedStudent;
}

const updateTertiaryEducationDetails = async (id, tertiaryEducationDetails, lastUpdatedBy) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { tertiary_education: tertiaryEducationDetails, last_updated_by: lastUpdatedBy } },
        { new: true }
    );
    if (!updatedStudent) throw new Error('Student not found');
    return updatedStudent;
}

const updateEmploymentHistoryDetails = async (id, employmentHistoryDetails, lastUpdatedBy) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { employment_history: employmentHistoryDetails, last_updated_by: lastUpdatedBy } },
        { new: true }
    );
    if (!updatedStudent) throw new Error('Student not found');
    return updatedStudent;
}

const updateLanguageProficiencyDetails = async (id, languageProficiencyDetails, lastUpdatedBy) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { language_proficiency: languageProficiencyDetails, last_updated_by: lastUpdatedBy } },
        { new: true }
    );
    if (!updatedStudent) throw new Error('Student not found');
    return updatedStudent;
}

const updateUnsubmittedProgrammes = async (id, unsubmittedProgrammes, lastUpdatedBy) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { unsubmitted_programmes: unsubmittedProgrammes, last_updated_by: lastUpdatedBy } },
        { new: true }
    );
    if (!updatedStudent) throw new Error('Student not found');
    return updatedStudent;
}

const updateSubmittedProgrammes = async (id, submittedProgrammes, lastUpdatedBy) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        {
            $set: {
                submitted_programmes: submittedProgrammes,
                last_updated_by: lastUpdatedBy
            }
        },
        { new: true }
    );

    if (!updatedStudent) {
        throw new Error('Student not found');
    }

    return updatedStudent;
};


const uploadStudentAvatar = async (id, avatarPath, lastUpdatedBy) => {
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: { avatar: avatarPath, last_updated_by: lastUpdatedBy } },
        { new: true }
    );
    if (!updatedStudent) throw new Error('Student not found');
    return updatedStudent;
}

const addDocumentToStudent = async (studentId, documentData, lastUpdatedBy) => {
    try {
      const student = await Student.findById(studentId);
  
      if (!student) {
        return null; // student not found
      }
      // Check if documentData is object and has the required prop  erties
      if (typeof documentData !== 'object' ) {
          console.error('Invalid document data:', testDoc);
          throw new Error('Invalid document data');
      }

      student.last_updated_by = lastUpdatedBy; // Update the last_updated_by field
      // Push documentData directly into the documents array
      student.documents.push(documentData);
  
      // Save the student with the new document
      await student.save();
  
      return student;
    } catch (error) {
      console.error('Error adding document:', error);
      throw new Error('Failed to add document');
    }
  };
  

module.exports = {
    getAllStudents,
    getStudentById,
    getUniversities,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentByStudentId,
    updateStudentContactDetails,
    updateStudentAddressDetails,
    updateEmergencyContactsDetails,
    updateAcademicDetails,
    updateTertiaryEducationDetails,
    updateEmploymentHistoryDetails,
    updateLanguageProficiencyDetails,
    updateUnsubmittedProgrammes,
    updateSubmittedProgrammes,
    uploadStudentAvatar,
    addDocumentToStudent,
};
