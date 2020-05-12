const express = require("express");
const router = express.Router();

const {
  getJobById,
  createJob,
  showJobPage,
  showHomePage,
  updateJob,
  deleteJob,
  showCreateJobPage,
  applyForJob,
} = require("../controllers/job");

const { ensureAuthenticated } = require("../controllers/auth");
const Job = require("../models/job");

router.param("JobId", getJobById);

router.get("/home", ensureAuthenticated, showHomePage);

router.get("/jobpost", ensureAuthenticated, showCreateJobPage);

router.post("/jobpost", ensureAuthenticated, createJob);

router.get("/jobpost/:JobId", showJobPage);

router.put("/jobpost/:JobId", ensureAuthenticated, updateJob);

router.delete("/jobpost/:JobId", ensureAuthenticated, deleteJob);

router.post("/action", function (req, res) {
  let str = req.body.buttonAction;
  let action = str.substring(0, 4);
  let jobID = str.substring(4);
  if (action === "view") {
    res.redirect("/jobpost/" + jobID);
  }
  if (action === "aply") {
    // ONE CLICK APPLY ROUTE
    res.redirect("/apply/" + jobID);
  }
});

router.get("/jobpost/myjob", ensureAuthenticated, applyForJob);

module.exports = router;
