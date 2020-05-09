const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Create a Elgibility Schema
const ElgibilitySchema = new Schema(
    {
        branch: {
            title: "Eligible Branches",
            type: Array,
        },

        cgpa: {
            title: "Minimum CGPA",
            type: Number,
        },

        backlogAllowed: {
            title: "Backlog Student allowed or not",
            type: Boolean,      //true if allowed, false otherwise
        }
    }
);

//Create a File Schema
const FileSchema = new Schema(
    {
        name: {
            title: "File Name",
            type: String,
            required: false,
        },

        url: {
            title: "File Url",
            type: String,
            required: false,
        }
    }
);



//Jobs Schema
const jobsSchema = Schema({

    jobID: {
        type: String,
    },

    companyName: {
        title: "Company Name",
        type: String,
        required: false,
        trim: true,
        maxlength: 40,
    },

    companySector: {
        title: "Company Sector",            // Food, Banking, Automobiles
        type: String,
        trim: true,
        maxlength: 40,
    },

    position: {
        title: "Post Name",        //Senior SD or Network Engineer or Assistat Sales manager (AKA Position)
        type: String,
        trim: true,
        maxlength: 40
    },


    profile: {
        title: "Job Profile",       //IT Services, Analytics, 
        type: String,
        trim: true,
    },

    session: {
        title: "Session",       // 2019-20 (Could be shown in tags)
        type: String,
        minlength: 3,
        maxlength: 3,
        trim: true
    },

    category: {
        title: "Type of Job",       //Eg. Internship, Full Time, WFH, Project, etc (Could be shown in tags)
        type: String
    },

    jobDescription: {
        title: "Job Description",
        type: String,
        required: true,
    },

    ctc: {                      //package can be used instead for generalization
        title: "CTC",              
        type: String,           // To give more flexibility for eg. if ctc is not decided simply TBD can be written.
        required: false,
    },

    eligibility: {                       
        title: "Elgibility",            
        type: ElgibilitySchema,         //To obtain nested JSON object to get more clarity(instead of branch and ctc as seperate entity in JobPostSchema itself).
    },

    note: {
        title: "Note from the company",     //eg. "Students opting for higher education need not apply", etc
        type: [String]                      // So that multiple notes can be displyed as bulltet points.
    },

    file: {
        title: "Files Uploaded",            //eg. CV, cover letter
        type: [FileSchema],
    },
    dateOfPost: {
        title: "Date of Post",
        type: Date,
        default: Date.now,
    },
});

//Collection
const Job = mongoose.model("Jobpost", jobsSchema);

module.exports = Job