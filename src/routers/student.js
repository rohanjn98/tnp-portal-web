const express = require('express');
const { ensureAuthenticated } = require("../controllers/auth");
const { uploadAvatar, uploadResume } = require('../../config/avatar');
const {
    getStudentById,
    showProfilePage,
    showAllStudentsPage,
    updateProfile,
    updatedProfile,
    deleteStudent,
    showUpdateProfilePage,
    createAvatar,
    deleteAvatar,
    showAvatar,
    createResume,
    deleteResume,
    showResume
} = require("../controllers/student");
const router = express.Router();

router.param("StudentId", getStudentById);

router.get("/students", ensureAuthenticated, showAllStudentsPage);

router.get("/student/profile", ensureAuthenticated, showUpdateProfilePage);

router.post("/student", ensureAuthenticated, updateProfile);

router.post('/student/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), createAvatar)

router.post('/student/resume', ensureAuthenticated, uploadResume.single('resume'), createResume)

router.delete('/student/avatar', ensureAuthenticated, deleteAvatar)

router.get('/:StudentId/avatar', ensureAuthenticated, showAvatar)

router.delete("/student/:StudentId", ensureAuthenticated, deleteStudent);

module.exports = router;
