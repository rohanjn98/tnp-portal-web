const Schedule = require("../models/schedule")
const Record = require('../models/record')
const express = require("express")


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
    try {

      const schedules = await Record.find({ student: req.user._id })
        .populate({
          path: "job",
          model: "Jobpost",
          select: "companyName",
          populate: { path: "schedule", model: "Schedule" }
        },);


      console.log(schedules);
      res.render('view-applications', {
        schedules: schedules
      });

    } catch (e) {
      return res.status(400).json({
            error: "Schedules not found"
          });
    }
  });
}