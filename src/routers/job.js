const express = require('express')
const router = express.Router();

const {
  getJobById,
  createJob,
  showJobPage,
  showHomePage,
  updateJob,
  deleteJob,
  showCreateJobPage,
  applyJob,
  filterJobs,
} = require('../controllers/job');
const { getStudentById } = require('../controllers/student')

const { ensureAuthenticated } = require('../controllers/auth');
const Job = require('../models/job')

router.param("JobId", getJobById);
router.param("StudentId", getStudentById);

router.get('/home/:page', ensureAuthenticated, showHomePage);

router.get("/home/:page/jobpost", ensureAuthenticated, showCreateJobPage);

router.post("/jobpost", ensureAuthenticated, createJob);

router.get("/jobpost/:JobId", showJobPage);

router.put("/jobpost/:JobId", ensureAuthenticated, updateJob);

router.delete("/jobpost/:JobId", ensureAuthenticated, deleteJob);

// Apply Job Routes
router.get("/applyjob/:JobId/", ensureAuthenticated, applyJob)

// Filter Job Route
router.post("/searchfilter/:page", ensureAuthenticated, filterJobs)

router.post("/action", function (req, res) {
  let str = req.body.buttonAction;
  let action = str.substring(0, 4);
  let jobID = str.substring(4);
  if (action === "view") {
    res.redirect("/jobpost/" + jobID);
  }
  else if (action === "aply") {
    // ONE CLICK APPLY ROUTE
    res.redirect("/applyjob/" + jobID);
  }
});

module.exports = router;
