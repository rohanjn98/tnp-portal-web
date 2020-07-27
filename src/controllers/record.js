const Jobpost = require("../models/job")
const Student = require("../models/student")
const Record = require("../models/record")

exports.getJobStatusById = async (req, res, next, id) => {
    try {
        const record = await Record.findById(id)
        req.record = record;
        next();
    } catch (error) {
        res.status(500).send()
    }
}

exports.showJobStatus = async (req, res) => {
    try {
        return res.send(req.record);
    }
    catch (error) {
        res.status(500).send()
    }
};

// Old Read
exports.showAllJobStatus = async (req, res) => {
    try {
        res.render('allrecords', { Records: [] })
    }
    catch (e) {
        res.send('Error: ' + e);
    }

};
// New Method Read
exports.showThatJobStatus = async (req, res) => {
    try {
        var fltrCompName = req.body.fltrCompName;
        var fltrCategory = req.body.fltrCategory;
        if (fltrCategory != "" && fltrCategory != "Choose...") {
            var fltrParam = {
                $and: [{ 'companyName': fltrCompName }, { 'category': fltrCategory }]
            }
        }
        else {
            var fltrParam = {}
            res.send("Enter both the inputs.");
        }
        console.log(fltrParam['$and'])
        const thatJobStatus = await Jobpost.find(fltrParam)
        console.log(thatJobStatus)
        const jobIdentity = thatJobStatus[0]._id;
        console.log(jobIdentity);
        const thatRecordStatus = await Record.find({ 'job': jobIdentity }).populate("student job", "firstName lastName enrollment cgpa department companyName profile category").exec();
        console.log(thatRecordStatus)
        //sorting according to Firstname (Can sort with Branches for furhter clarity)
        thatRecordStatus.sort(function (a, b) {
            var nameA = a.student.firstName.toUpperCase();
            var nameB = b.student.firstName.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });

        res.render('allrecords', { Records: thatRecordStatus })
    }
    catch (e) { res.send('Error: ' + e); }
}

exports.updateJobStatus = async (req, res) => {

    if (req.user.role === 1) {
        const record = req.record;
        record.jobStatus = req.body.jobStatus;
        try {
            await record.save()
            res.redirect('/home/1')
        } catch (error) {
            res.status(500).send()
        }
    } else {
        res.redirect('/login')
    }
}

exports.deleteJobStatus = async (req, res) => {

    if (req.user.role === 1) {
        const record = req.record;
        try {
            await record.remove()
            res.redirect('/home/1')
        } catch (error) {
            res.status(500).send()
        }
    } else {
        res.redirect('/login')
    }
}
