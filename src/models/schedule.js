const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ScheduleSchema = new Schema(
    {
        date: {
            title: "date of event",     // event can be "PPT", "Online Exam", "Interview"
            type: Date,
            required: true,
            default: Date()
        },

        eventName: {
            title: "Name of event",
            type: String,
            required: true
        },
        jobId: {
            title: 'Id of the job',             //To fetch the jobpost info
            type: String,
            required: true
        }

    }
);

module.exports = mongoose.model('Schedule', ScheduleSchema);