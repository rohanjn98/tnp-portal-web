const mongoose = require('mongoose');

//Create a schema

const EducationSchema = new mongoose.Schema({
    institute: {
        title: "Institue Name",
        type: String,
        //required: true
    },
    degree: {
        title: "Degree",
        type: String,
        //required: true
    },
    startDate: {
        title: "Start Date of college",
        type: Date,
        //required: true
    },
    endDate: {
        title: "End Date of college",
        type: Date,
        //required: true
    },
    cgpa: {
        title: "CGPA/Percentage",
        type: Number
    }
});

const AddressSchema = new mongoose.Schema({
    // typeOfAddress: {
    //     title: "Type of Address",
    //     type: String,
    //     enum: ["Permanent", "Current"]
    // },
    addressLine1: {
        title: "Address Line 1",
        type: String,
        //required: true
    },
    addressLine2: {
        title: "Address Line 2",
        type: String,

    },
    city: {
        title: "City",
        type: String,
        //required: true
    },
    state: {
        title: "State",
        type: String,
        //required: true
    },
    country: {
        title: "Country",
        type: String,
        //required: true
    },

});

const ExperienceSchema = new mongoose.Schema({
    experienceTitle: {
        title: "title of Experience",           //Eg. Software Development Intern, etc
        type: String,
        //required: true
    },
    employmentType: {
        title: "Type of employment",
        type: String,
        enum: ["Full-Time", "Part-Time", "Self-Employed", "Freelance", "Contract", "Internship", "Apprenticeship"],
        //required: true

    },
    organization: {
        title: "Name of Company",
        type: String,
        //required: true
    },
    startDate: {
        title: "Start Date",
        type: Date,
        //required: true
    },
    endDate: {
        title: "End Date",
        type: Date,
        //required: true
    }
});

//Create a Student Schema schema

const StudentSchema = new mongoose.Schema({
    idNo: {
        title: "Id Number",
        type: Number,
        required: false
    },
    enrollment: {
        title: "Enrollment Number",
        type: String,
        minlength: 10,
        maxlength: 10,
        required: false
    },
    firstName: {
        title: "First Name",
        type: String,
        trim: true,
        maxlength: 20,
        required: true
    },
    middleName: {
        title: "Middle Name",
        type: String,
        trim: false,
        maxlength: 20
    },
    lastName: {
        title: "Last Name",
        type: String,
        trim: true,
        maxlength: 20
    },
    email: {
        title: "Email",
        type: String,
        format: "email",
        trim: true,
        required: true
    },
    department: {
        title: "Department",
        type: String,
        trim: false,
    },
    year: {
        title: "year",
        type: String,
        required: false,
    },
    cgpa: {
        title: "CGPA",
        type: Number,
        required: false,

    },
    password:{
        type: String,
        required: true
        //trim: true,
    },
    salt: String,
    role:{
        type: Number,
        default: 1
        // 0 if Regular User, 1 if Admin
        },
    postSaved: {
        title: "Post Applied",
        type: Array,
        default: [],
        required: false
    },
    contact: {
        title: "Contact",
        type: Number,
        required: false
    },
    dob: {
        title: "Date of birth",
        type: Date,
        required: false,
    },
    gender: {
        title: "Gender",
        type: String,
        enum: ["Male", "Female", "Prefer Not To Say"],
        required: false,
    },
    category: {
        title: "Category",
        type: String,
        enum: ["SC", "ST", "OBC", "General", "Other"],
        required: false,
    },
    pwd: {
        title: "Person with disability",
        type: String,
        required: false,
    },
    education: {
        title: "Education",
        type: [EducationSchema],
        required: false,
    },
    address: {
        title: "Addresses",
        type: [AddressSchema]
    },
    experience: {
        title: "Experience",
        type: [ExperienceSchema]
    },
    linkedin: {
        title: "LinkedIn",
        type: String
    },
    github: {
        title: "GitHub",
        type: String
    },
    fileName: {
        title: "Resume",
        type: Buffer
    },

},
{timestamps: true}
);

module.exports = mongoose.model('Student', StudentSchema);
