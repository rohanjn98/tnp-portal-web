const express = require('express')
const router = express.Router();

const { getJobStatusById, showJobStatus, showAllJobStatus, updateJobStatus, deleteJobStatus, showThatJobStatus } = require('../controllers/record');
const { ensureAuthenticated } = require('../controllers/auth');

// MiddleWare for Id
router.param("JobStatusId", getJobStatusById);


// Create route done in One Click Apply

// Read Route
// Company wise- Read (new Implementation) with filter posting
router.post('/showrecords', showThatJobStatus)
// Original route- to be depricated
router.get('/jobstatus/:JobStatusId', ensureAuthenticated, showJobStatus);
router.get('/searchjobstatus', showAllJobStatus);




// Update
router.put("/jobstatus/:JobStatusId", ensureAuthenticated, updateJobStatus);

// Delete
router.delete("/jobstatus/:JobStatusId", ensureAuthenticated, deleteJobStatus);

module.exports = router;



