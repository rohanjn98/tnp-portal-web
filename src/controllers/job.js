const Jobpost = require("../models/job")

exports.getJobById = async (req, res, next, id) => {
  try {
    const job = await Jobpost.findById(id)
    req.jobpost = job;
    next();
  } catch (error) {
    res.status(500).send()
  }
}

exports.showHomePage = async (req, res) => {
  try {
      const jobs = await Jobpost.find({})
      if (jobs.length === 0) {
        res.send('<h1>No jobs eh, mate!</h1>');
      } else {
        res.render('home', { jobs });
      }
  } catch (error) {
    res.status(500).send()
  }
}

exports.showCreateJobPage = (req, res) => {
  if (req.user.role === 1) {
    res.render("add-job")   
  } else {
    res.redirect('/login')
  }
}

exports.createJob = async (req, res) => {
  if (req.user.role === 1) {
      const job = new Jobpost(req.body);
      try {
        await job.save()
        res.redirect('/home')
      } catch (error) {
        res.status(500).send()
      }
  } else {
    res.redirect('/login')
  }
}

exports.showJobPage = (req, res) => {
  res.render("job", {
    job: req.jobpost
  })
}

exports.updateJob = async (req, res) => {
  // TODO --> Refactor this code to allow for valid updates only
  if (req.user.role === 1) {
    const job = req.jobpost;
    job.ctc = req.body.ctc;
    try {
      await job.save()
      res.redirect('/home')
    } catch (error) {
      res.status(500).send()
    }
  } else {
    res.redirect('/login')
  }
}

exports.deleteJob = async (req, res) => {
  if (req.user.role === 1) {
    const job = req.jobpost;
    try {
      await job.remove()
      res.redirect('/home')
    } catch (error) {
      res.status(500).send()
    }
  } else {
    res.redirect('/login')
  }
}