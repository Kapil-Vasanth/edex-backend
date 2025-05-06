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
    updateStudentAddressDetails,
    updateAcademicDetails,
    updateTertiaryEducationDetails,
    updateEmergencyContactsDetails,
    updateEmploymentHistoryDetails,
    updateLanguageProficiencyDetails,
    uploadStudentAvatar,
    updateUnsubmittedProgrammes,
    uploadStudentDocument
} = require('../controllers/studentControllers');
const { uploadAvatar, uploadDocument } = require('../middleware/uploads');
const {
    authenticate,
    authorize,
    allowSelfOrAdmin
  } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply universal auth + self-or-admin check
router.use(authenticate);

router.post('/',authorize(['agent']), createStudent);
router.get('/',authorize(['agent']), getAllStudents);
router.get('/:id',allowSelfOrAdmin(), getStudentByStudentId);
router.put('/:id', updateStudent);
router.get('/:id/contact-details', getStudentContactDetails);
router.put('/:id/contact-details', updateStudentContactDetails);

router.put('/:id/address-details', updateStudentAddressDetails);

router.put('/:id/emergency-details', updateEmergencyContactsDetails);
router.put('/:id/academic-details', updateAcademicDetails);
router.put('/:id/tertiary-education', updateTertiaryEducationDetails);
router.put('/:id/employment-history', updateEmploymentHistoryDetails);
router.put('/:id/language-proficiency', updateLanguageProficiencyDetails);
router.put('/:id/unsubmitted-programmes', updateUnsubmittedProgrammes);



router.post('/:id/upload-avatar', uploadAvatar.single('avatar'), uploadStudentAvatar);
router.post('/:id/upload-document', uploadDocument.single('document'), uploadStudentDocument);

// Route to delete a student by ID
router.delete('/:id', deleteStudent);

module.exports = router;
