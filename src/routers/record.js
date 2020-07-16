const express = require('express')
const router = express.Router();

const { getJobStatusById, showJobStatus, showAllJobStatus, updateJobStatus, deleteJobStatus } = require('../controllers/record');
const { ensureAuthenticated } = require('../controllers/auth');

// MiddleWare for ID
router.param("JobStatusId", getJobStatusById);


// Create route done in One Click Apply

// Read Route
router.get('/jobstatus/:JobStatusId', ensureAuthenticated, showJobStatus);
router.get('/alljobstatus', showAllJobStatus);


// Update
router.put("/jobstatus/:JobStatusId", ensureAuthenticated, updateJobStatus);

// Delete
router.delete("/jobstatus/:JobStatusId", ensureAuthenticated, deleteJobStatus);

module.exports = router;



