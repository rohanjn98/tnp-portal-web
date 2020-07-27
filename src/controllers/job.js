const Jobpost = require("../models/job")
const Student = require("../models/student")
const Record = require("../models/record")

exports.getJobById = async (req, res, next, id) => {
    try {
        const job = await Jobpost.findById(id)
        req.jobpost = job;
        next();
    } catch (error) {
        res.status(500).send()
    }
}

exports.showHomePage = async (req, res) => {
    // Method1: Currently implemented using fuzzy Search
    // Method2: Efficient method is using text indexes -> https://docs.mongodb.com/manual/core/index-text/
    // Method3: Complete implementation on front-end using 'onkeyup'
    const page = parseInt(req.params.page)
    const pagination = 3

    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi') //g -> global match, i -> ignore case
        try {
            const jobs = await Jobpost.paginate({
                'companyName': regex
            }, { page: page, limit: pagination });
            console.log(jobs)
            if (jobs.docs.length === 0) {
                res.send('<h1>No jobs eh, mate!</h1>');
            } else {
                res.render('home', {
                    total: jobs.total,
                    limit: jobs.limit,
                    page: jobs.page,
                    pages: jobs.pages,
                    jobs: jobs.docs,

                });
            }
        } catch (error) {
            res.status(500).send()
        }
    } else {
        try {
            console.log(req.user.role)
            const paginatedResults = await Jobpost.paginate({}, { page: page, limit: pagination })
            if (paginatedResults.docs.length === 0) {
                res.send('<h1>No jobs eh, mate!</h1>');
            } else if (req.user.role == 0) {
                res.render('home', {
                    total: paginatedResults.total,
                    limit: paginatedResults.limit,
                    page: paginatedResults.page,
                    pages: paginatedResults.pages,
                    jobs: paginatedResults.docs
                });
            }
            else {
                res.render('dashboard');
            }
        } catch (error) {
            res.status(500).send()
        }
    }
}

exports.showCreateJobPage = (req, res) => {
    if (req.user.role === 1) {
        res.render('add-job')
    } else {
        res.redirect('/login')
    }
}

exports.createJob = async (req, res) => {
    if (req.user.role === 1) {
        const job = new Jobpost(req.body);
        console.log(job);
        try {
            await job.save()
            res.redirect('/home/1')
        } catch (error) {
            res.status(500).send()
        }
    } else {
        res.redirect('/login')
    }
}

exports.showJobPage = (req, res) => {
    res.render("job", {
        job: req.jobpost
    })
}

exports.updateJob = async (req, res) => {
    // TODO --> Refactor this code to allow for valid updates only
    if (req.user.role === 1) {
        const job = req.jobpost;
        job.ctc = req.body.ctc;
        try {
            await job.save()
            res.redirect('/home/1')
        } catch (error) {
            res.status(500).send()
        }
    } else {
        res.redirect('/login')
    }
}

exports.deleteJob = async (req, res) => {
    if (req.user.role === 1) {
        const job = req.jobpost;
        try {
            await job.remove()
            res.redirect('/home/1')
        } catch (error) {
            res.status(500).send()
        }
    } else {
        res.redirect('/login')
    }
}

const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")

// COntrollers for One click apply


exports.applyJob = async (req, res) => {
    // console.log(req.jobpost)
    try {
        // console.log(req.user._id)
        // console.log(Record)

        let flag = 0;

        //CGPA Check
        if (req.user.cgpa >= req.jobpost.eligibility.cgpa) {
            console.log('CGPA criteria satisfied! :)')
            flag++;
        }
        else {
            console.log('CGPA criteria Not satisfied!')
        }
        //Bklg check
        if (req.user.backlog === req.jobpost.eligibility.backlogAllowed) {
            flag++;
            console.log("Backlog criteria satisfied! :)")
        }
        else {
            console.log('Backlog criteria Not satisfied!')
        }
        // Branch Check
        if (req.jobpost.eligibility.branch.includes(req.user.department)) {
            flag++;
            console.log('Branch criteria satisfied! :)')
        }
        else {
            console.log('Branch criteria Not satisfied!')
        }
        if (flag === 3) {
            // Save Job in PostSaved- To be Depricated.
            // req.user.postSaved.push(req.jobpost.companyName)
            // req.user.save();

            // Save in Record schema
            const record = new Record({
                student: req.user._id,
                job: req.jobpost._id,
                //* Change Made
                jobStatus: "Applied"
            })
            await record.save();
            //const savedRecord = await Record.find({}).populate(["student", "job"]).exec();
            //console.log(savedRecord);
            //res.send(savedRecord);
            const savedRecord1 = await Record.find({}).populate("student", "firstName lastName enrollment cgpa").exec();
            const savedRecord2 = await Record.find({}).populate("job", "companyName profile").exec();
            // This works like a Charm, v.v. cool!
            const savedRecord3 = await Record.find({}).populate("student job", "firstName lastName enrollment cgpa companyName profile").exec();

            // console.log(savedRecord1);
            // console.log(savedRecord2);
            console.log(savedRecord3);

            res.send(savedRecord1);
        }
        else {
            console.log('Cannot apply to this Job!')
        }
        //TODO- add Flash message for applied or not succesfully.
        // res.render("job", {
        //     job: req.jobpost
        // })
    }
    catch (e) {
        res.send('Error: ' + e);
    }
}

exports.filterJobs = async (req, res) => {
    //const jobs = await Jobpost.find({})

    var fltrName = req.body.fltrname;
    var fltrProfile = req.body.fltrProfile;
    var fltrCTC = req.body.fltrCTC;

    if (fltrName != '' && fltrProfile != "" && fltrCTC != "Choose...") {
        if (fltrCTC === "1") {
            var fltrParameter = {
                $and: [{ 'companyName': fltrName }, { 'profile': fltrProfile }, { 'ctc': { $gte: '0 LPA', $lte: '8 LPA' } }]
            }
        }
        else if (fltrCTC === "2") {
            var fltrParameter = {
                $and: [{ 'companyName': fltrName }, { 'profile': fltrProfile }, { 'ctc': { $gt: '8 LPA', $lte: '15 LPA' } }]
            }
        }
        else if (fltrCTC === "3") {
            var fltrParameter = {
                $and: [{ 'companyName': fltrName }, { 'profile': fltrProfile }, { 'ctc': { $gt: '15 LPA', $lte: '20 LPA' } }]
            }
        }
        else if (fltrCTC === "4") {
            var fltrParameter = {
                $and: [{ 'companyName': fltrName }, { 'profile': fltrProfile }, { 'ctc': { $gt: '20 LPA', $lte: '30 LPA' } }]
            }
        }
        else if (fltrCTC === "5") {
            var fltrParameter = {
                $and: [{ 'companyName': fltrName }, { 'profile': fltrProfile }, { 'ctc': { $gt: '30 LPA' } }]
            }
        }
    }
    else if (fltrName != '' && fltrProfile == "" && fltrCTC != "Choose...") {
        if (fltrCTC === "1") {
            var fltrParameter = {
                $and: [{ 'companyName': fltrName }, { 'ctc': { $gte: '0 LPA', $lte: '8 LPA' } }]
            }
        }
        else if (fltrCTC === "2") {
            var fltrParameter = {
                $and: [{ 'companyName': fltrName }, { 'ctc': { $gt: '8 LPA', $lte: '15 LPA' } }]
            }
        }
        else if (fltrCTC === "3") {
            var fltrParameter = {
                $and: [{ 'companyName': fltrName }, { 'ctc': { $gt: '15 LPA', $lte: '20 LPA' } }]
            }
        }
        else if (fltrCTC === "4") {
            var fltrParameter = {
                $and: [{ 'companyName': fltrName }, { 'ctc': { $gt: '20 LPA', $lte: '30 LPA' } }]
            }
        }
        else if (fltrCTC === "5") {
            var fltrParameter = {
                $and: [{ 'companyName': fltrName }, { 'ctc': { $gt: '30 LPA' } }]
            }
        }
    }
    else if (fltrName == '' && fltrProfile != "" && fltrCTC != "Choose...") {
        if (fltrCTC === "1") {
            var fltrParameter = {
                $and: [{ 'profile': fltrProfile }, { 'ctc': { $gte: '0 LPA', $lte: '8 LPA' } }]
            }
        }
        else if (fltrCTC === "2") {
            var fltrParameter = {
                $and: [{ 'profile': fltrProfile }, { 'ctc': { $gt: '8 LPA', $lte: '15 LPA' } }]
            }
        }
        else if (fltrCTC === "3") {
            var fltrParameter = {
                $and: [{ 'profile': fltrProfile }, { 'ctc': { $gt: '15 LPA', $lte: '20 LPA' } }]
            }
        }
        else if (fltrCTC === "4") {
            var fltrParameter = {
                $and: [{ 'profile': fltrProfile }, { 'ctc': { $gt: '20 LPA', $lte: '30 LPA' } }]
            }
        }
        else if (fltrCTC === "5") {
            var fltrParameter = {
                $and: [{ 'profile': fltrProfile }, { 'ctc': { $gt: '30 LPA' } }]
            }
        }
    }
    else if (fltrName == '' && fltrProfile == "" && fltrCTC != "Choose...") {
        if (fltrCTC === "1") {
            var fltrParameter = {
                $and: [{ 'ctc': { $gt: '1 LPA', $lte: '8 LPA' } }]
            }
        }
        else if (fltrCTC === "2") {
            var fltrParameter = {
                $and: [{ 'ctc': { $gt: '8 LPA', $lte: '15 LPA' } }]
            }
        }
        else if (fltrCTC === "3") {
            var fltrParameter = {
                $and: [{ 'ctc': { $gte: '15 LPA', $lte: '20 LPA' } }]
            }
        }
        else if (fltrCTC === "4") {
            var fltrParameter = {
                $and: [{ 'ctc': { $gt: '20 LPA', $lte: '30 LPA' } }]
            }
        }
        else if (fltrCTC === "5") {
            var fltrParameter = {
                $and: [{ 'ctc': { $gt: '30 LPA' } }]
            }
        }
    }
    else if (fltrName != '' && fltrProfile == "" && fltrCTC == "Choose...") {
        var fltrParameter = {
            $and: [{ 'companyName': fltrName }]
        }
    }
    else if (fltrName == '' && fltrProfile != "" && fltrCTC == "Choose...") {
        var fltrParameter = {
            $and: [{ 'profile': fltrProfile }]
        }
    }
    else if (fltrName != '' && fltrProfile != "" && fltrCTC == "Choose...") {
        var fltrParameter = {
            $and: [{ 'companyName': fltrName }, { 'profile': fltrProfile }]
        }
    }
    else {
        var fltrParameter = {}
    }

    console.log(fltrParameter['$and'])


    const page = parseInt(req.params.page)
    const pagination = 3
    const paginatedResults = await Jobpost.paginate(fltrParameter, { page: page, limit: pagination })
    if (paginatedResults.docs.length === 0) {
        res.send('<h1>No jobs eh, mate!</h1>');
    } else {
        res.render('home', {
            total: paginatedResults.total,
            limit: paginatedResults.limit,
            page: paginatedResults.page,
            pages: paginatedResults.pages,
            jobs: paginatedResults.docs
        });
    }
}