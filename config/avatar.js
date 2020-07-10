const multer = require('multer')
const sharp = require('sharp')

exports.uploadAvatar = multer({
    limits: {
        fileSize: 5000000
    },
    fileFilter (req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a jgp/jpeg/png file.'))
        }
        cb(undefined, true)
    }
})

exports.uploadResume = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter (req, file, cb) {
        if(!file.originalname.match(/\.(pdf)$/)) {
            return cb(new Error('Please upload a pdf file.'))
        }
        cb(undefined, true)
    }
})
