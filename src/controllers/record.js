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

exports.showAllJobStatus = (req, res) => {
    Record.find().exec((error, records) => {
        if (error || !records) {
            return res.status(400).json({
                error: "No records Found"
            })
        }
        res.json(records)
    })
};

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
