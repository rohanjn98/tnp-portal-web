const Schedule = require("../models/schedule")
const Jobpost = require('../models/job')
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
   Schedule.find().sort({ date: 1 }).exec(async function findAndGet(err, schedules){
    if (err) {
      return res.status(400).json({
        error: "NO categories found"
      });
    }else{
      try{
        
        var jobposts = await getJobs(schedules);
        //console.log("First try: "+jobposts.length);
        var today = schedules.filter((a)=>{
          return a.date.getDate() == new Date().getDate() &&  a.date.getMonth() == new Date().getMonth() && a.date.getFullYear() == new Date().getFullYear();
        });

        var yesterday = schedules.filter((a)=>{
          return a.date.getDate() == new Date().getDate()-1 &&  a.date.getMonth() == new Date().getMonth() && a.date.getFullYear() == new Date().getFullYear();
        });

        var upcoming = schedules.filter((a)=>{
          return a.date > new Date();
        });
        res.render('view-applications', {
          today: today,
          yesterday: yesterday,
          upcoming: upcoming,
          jobs: jobposts
        });
        
      }catch(e){
        console.log(e);
      }
      
    }
    //res.render();
    
    
  });
};

async function getJobs(schedules){
  
  var jobposts;
  
  try{
    jobposts =  await Jobpost.find();
    return jobposts;
  }catch(e){
    console.log(e);
  }
  
 return; 
}


exports.getScheduleByJobId = (req, res) => {
  Schedule.find({ jobId: req.params.jobId }).exec((err, schedule) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB"
      });
    }
    res.status(200).json(schedule);

  })
};


