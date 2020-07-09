const Jobpost = require("../models/job")
const Student = require("../models/student")

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
            }, { page: page, limit: pagination })
            if (paginatedResults.docs.length === 0) {
                res.send('<h1>No jobs eh, mate!</h1>');
            } else {
                res.render('home',{
                  total:paginatedResults.total,
                  limit:paginatedResults.limit,
                  page:paginatedResults.page,
                  pages:paginatedResults.pages,
                  jobs:paginatedResults.docs
                });
            }
        } catch (error) {
            res.status(500).send()
        }
    } else {
        try {
            const paginatedResults = await Jobpost.paginate({}, { page: page, limit: pagination })
            if (paginatedResults.docs.length === 0) {
                res.send('<h1>No jobs eh, mate!</h1>');
            } else {
                res.render('home',{
                  total:paginatedResults.total,
                  limit:paginatedResults.limit,
                  page:paginatedResults.page,
                  pages:paginatedResults.pages,
                  jobs:paginatedResults.docs
                });
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
    console.log(req.jobpost)
    console.log(req.user)
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
        req.user.postSaved.push(req.jobpost.companyName)
        req.user.save();
    }
    else {
        console.log('Cannot apply to this Job!')
    }
    //TODO- add Flash message for applied or not succesfully.
    res.render("job", {
        job: req.jobpost
    })
}

exports.filterJobs = async (req, res) => {
    //const jobs = await Jobpost.find({})

    var fltrName = req.body.fltrname;
    var fltrProfile = req.body.fltrProfile;
    var fltrCTC = req.body.fltrCTC;
    var fltrDream = req.body.fltrDream;

    if (fltrName != '' && fltrProfile != "" && fltrCTC != "") {
        var fltrParameter = {
            $and: [{ 'companyName': fltrName }, { 'profile': fltrProfile }, { 'ctc': fltrCTC }]
        }
    }
    else if (fltrName != '' && fltrProfile == "" && fltrCTC != "") {
        var fltrParameter = {
            $and: [{ 'companyName': fltrName }, { 'ctc': fltrCTC }]
        }
    }
    else if (fltrName == '' && fltrProfile != "" && fltrCTC != "") {
        var fltrParameter = {
            $and: [{ 'profile': fltrProfile }, { 'ctc': fltrCTC }]
        }
    }
    else if (fltrName == '' && fltrProfile == "" && fltrCTC != "") {
        var fltrParameter = { 'ctc': fltrCTC }
    }
    else {
        var fltrParameter = {}
    }

    console.log(fltrParameter)
    const jobs = await Jobpost.find(fltrParameter);
    console.log(jobs);
    if (jobs.length === 0) {
        res.send('<h1>No such companies found!</h1>');
    } else {
        res.render('home', {
            jobs
        });
    }
}
