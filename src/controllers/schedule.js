const Schedule = require("../models/schedule")
const Jobpost = require('../models/job')
const Record = require('../models/record')
const express = require("express")
const router = express.Router();


exports.createSchedule = (req, res) => {
  const schedule = new Schedule(req.body);
  schedule.save((err, schedule) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save jobpost in DB"
      });
    }
    res.json({ schedule });
  });

}

exports.getAllSchedules = (req, res) => {
  Record.find({ student: req.user._id }).exec(async function findAndGet(err, records) {
    // if (err) {
    //   return res.status(400).json({
    //     error: "Schedules not found"
    //   });
    // } else {
    try {

      const schedules = await Record.find({ student: req.user._id })
        .populate({
          path: "job",
          model: "Jobpost",
          select: "companyName",
          populate: { path: "schedule", model: "Schedule" }
        },);


      console.log(schedules);
      //res.status(200).json(schedules);

      // var jobposts = await getJobs(schedules);
      // //console.log("First try: "+jobposts.length);
      // var today = schedules.filter((a) => {
      //   return a.date.getDate() == new Date().getDate() && a.date.getMonth() == new Date().getMonth() && a.date.getFullYear() == new Date().getFullYear();
      // });

      // var yesterday = schedules.filter((a) => {
      //   return a.date.getDate() == new Date().getDate() - 1 && a.date.getMonth() == new Date().getMonth() && a.date.getFullYear() == new Date().getFullYear();
      // });

      // var upcoming = schedules.filter((a) => {
      //   return a.date > new Date();
      // });
      res.render('view-applications', {
        // today: today,
        // yesterday: yesterday,
        // upcoming: upcoming,
        // jobs: jobposts
        schedules: schedules
      });

    } catch (e) {
      console.log(e);
    }

  });
  //res.render();
}

// exports.getScheduleByJobId = (req, res) => {
//   Schedule.find({ jobId: req.params.jobId }).exec((err, schedule) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Category not found in DB"
//       });
//     }
//     res.status(200).json(schedule);

//   })
// };

exports.getSchedules = (req, res) => {
  Schedule.find().exec((err, schedule) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB"
      });
    }
    schedule_ids = [];
    schedule.forEach(element => {
      schedule_ids.push(element._id);
    });
    console.log(schedule_ids)
    res.status(200).json(schedule);

  })
};
