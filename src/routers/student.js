const express = require('express');
const upload = require('../../config/avatar')
const { ensureAuthenticated } = require("../controllers/auth");
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
    showAvatar
} = require("../controllers/student");
const router = express.Router();

router.param("StudentId", getStudentById);

router.get("/students", ensureAuthenticated, showAllStudentsPage);

router.get("/student/profile/makechanges", ensureAuthenticated, showUpdateProfilePage);
router.put("/student", ensureAuthenticated, updateProfile);
router.get("/student", ensureAuthenticated, updatedProfile);

router.get("/student/profile", ensureAuthenticated, showProfilePage);

router.post('/student/avatar', ensureAuthenticated, upload.single('avatar'), createAvatar)

router.delete('/student/avatar', ensureAuthenticated, deleteAvatar)

router.get('/:StudentId/avatar', ensureAuthenticated, showAvatar)

router.delete("/student/:StudentId", ensureAuthenticated, deleteStudent);

module.exports = router;