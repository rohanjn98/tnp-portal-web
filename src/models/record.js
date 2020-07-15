const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Record Schema
const recordSchema = new Schema({

    student: {
        type: Schema.Types.ObjectId,
        ref: "Student"
    },

    job: {
        type: Schema.Types.ObjectId,
        ref: "Jobpost"
    },
    jobStatus: {
        title: "Job Status",
        type: String, // Applied, SelectedForInterview, SelectedForJob
        enum: ["Applied", "Selected For Interview", "Selected For Job"],
        required: false,
    }
});

//Collection
const Record = mongoose.model("Record", recordSchema);
// console.log('This is the Record Schema');

module.exports = Record;
