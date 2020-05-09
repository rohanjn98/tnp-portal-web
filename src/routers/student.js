const express = require('express');
const upload = require('../../config/avatar')
const { ensureAuthenticated } = require("../controllers/auth");
const { 
    getStudentById,
    showProfilePage,
    showAllStudentsPage, 
    updateProfile, 
    deleteStudent, 
    showUpdateProfilePage, 
    createAvatar,
    deleteAvatar,
    showAvatar
} = require("../controllers/student");
const router = express.Router();

router.param("StudentId", getStudentById);

router.get("/students", ensureAuthenticated, showAllStudentsPage);

router.get("/student", ensureAuthenticated, showUpdateProfilePage);

router.post("/student", ensureAuthenticated, updateProfile);

router.get("/student/profile", ensureAuthenticated, showProfilePage);

router.post('/student/avatar', ensureAuthenticated, upload.single('avatar'), createAvatar)

router.delete('/student/avatar', ensureAuthenticated, deleteAvatar)

router.get('/:StudentId/avatar', ensureAuthenticated, showAvatar)

router.delete("/student/:StudentId", ensureAuthenticated, deleteStudent);

module.exports = router;