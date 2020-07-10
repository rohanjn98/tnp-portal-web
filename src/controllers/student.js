const Student = require('../models/student')
const multer = require('multer')
const sharp = require('sharp')

exports.getStudentById = async (req, res, next, id) => {
    try {
        const student = Student.findById(id)
        req.profile = student;
        next()
    } catch (error) {
        res.status(500).send()
    }
};

exports.showAllStudentsPage = async (req, res) => {
    if (req.user.role === 1) {
        try {
            const students = await Student.find()
            res.json(students)
        } catch (error) {
            res.status(500).send()
        }
    } else {
        res.redirect('/login')
    }
}

exports.showUpdateProfilePage = (req, res) => {
    console.log(req.user);
    res.render('add-profile-develop', {
        Student: req.user
    });
}

exports.updateProfile = async (req, res) => {
    const _id = req.user._id
    try {
        // This is done so that mongoose doesn't bypass the middleware. findOneById() bypasses the middleware.
        const student = await Student.findOne({_id})
        student.address = []
        student.experience = []
        student.education = []
        if (!student) {
            res.send('No such student')
        }
        const updates = Object.keys(req.body)

        updates.forEach((update) => student[update] = req.body[update])

        for (var i = 0; i < 2; i++) {
            var addressArray = req.body['address['+i+']']
            var addressObject = {
                addressLine1: addressArray[0],
                addressLine2: addressArray[1],
                city: addressArray[2],
                state: addressArray[3],
                country: addressArray[4]
            }
            student.address.push(addressObject)
        }

        var educationCount = 0;
        var experienceCount = 0;
        updates.forEach((update) => {
            if (update.includes('education')) {
                educationCount++;
            }
            if (update.includes('experience')) {
                experienceCount++;
            }
        });

        for (var i = 0; i < educationCount; i++) {
            var educationArray = req.body['education['+i+']']
            var startDate = new Date(educationArray[2]);
            var endDate = new Date(educationArray[3]);
            var educationObject = {
                institute: educationArray[0],
                degree: educationArray[1],
                startDate: startDate,
                endDate: endDate,
                cgpa: parseInt(educationArray[4])
            }
            student.education.push(educationObject)
        }

        for (var i = 0; i < experienceCount; i++) {
            var experienceArray = req.body['experience['+i+']']
            var startDate = new Date(experienceArray[3]);
            var endDate = new Date(experienceArray[4])
            var experienceObject = {
                organization: experienceArray[0],
                experienceTitle: experienceArray[1],
                employmentType: experienceArray[2],
                startDate: startDate,
                endDate: endDate
            }
            student.experience.push(experienceObject)
        }

        await student.save()

        res.send(student)
    } catch (error) {
        res.send(error)
    }
};

exports.createAvatar = (req, res) => {
    async (req, res) => {
        const buffer = await sharp(req.file.buffer).resize({
            width: 250,
            height: 250
        }).png().toBuffer()
        req.user.avatar = buffer
        await req.user.save()
        res.send()
    }, (error, req, res, next) => {
        res.status(400).send({
            error: error.message
        })
    }
}

exports.showAvatar = async (req, res) => {
    try {
        if (!req.user.avatar) {
            throw new Error('Avatar does not exist.')
        }
        res.set('Content-Type', 'image/jpg')
        res.send(req.user.avatar)
    } catch (error) {
        res.status(404).send({
            error: error.message
        })
    }
}

exports.deleteAvatar = async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}

exports.deleteStudent = async (req, res) => {
    if (req.user.role === 1) {
        const student = req.profile;
        try {
            await student.remove()
            res.redirect('/home/1')
        } catch (error) {
            res.status(500).send()
        }
    } else {
        res.redirect('/login')
    }
}
