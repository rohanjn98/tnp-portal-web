const multer = require('multer')
const sharp = require('sharp')

const upload = multer({
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

module.exports = upload