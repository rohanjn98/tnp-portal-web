const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema(
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
        }
        // ,
        // jobId: {
        //     title: 'Id of the job',             //To fetch the jobpost info
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Jobpost',
        //     required: true
        //}

    }
);

module.exports = mongoose.model('Schedule', ScheduleSchema);
