const express = require("express")
const router = express.Router();

const { ensureAuthenticated } = require("../controllers/auth");

const {
    getAllSchedules, 
    getScheduleByJobId, 
    createSchedule,
} = require("../controllers/schedule");

router.post("/schedule/create", ensureAuthenticated, createSchedule);

router.get("/schedule", ensureAuthenticated, getAllSchedules);

//router.get("/schedule/:jobId", ensureAuthenticated, getScheduleByJobId);

module.exports = router