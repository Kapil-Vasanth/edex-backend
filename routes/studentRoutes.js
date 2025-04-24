const express = require('express');
const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentByStudentId,
    getStudentContactDetails,
    updateStudentContactDetails,
    updateStudentAddressDetails
} = require('../controllers/studentControllers');

const router = express.Router();

router.post('/', createStudent);

router.get('/', getAllStudents);

router.get('/:id', getStudentByStudentId);

router.put('/:id', updateStudent);

router.get('/:id/contact-details', getStudentContactDetails);
router.put('/:id/contact-details', updateStudentContactDetails);

router.put('/:id/address-details', updateStudentAddressDetails);

router.put('/:id/emergency-details', updateStudentAddressDetails);

// Route to delete a student by ID
router.delete('/:id', deleteStudent);

module.exports = router;
