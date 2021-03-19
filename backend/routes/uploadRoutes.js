const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')
const multer = require('multer')
const storage = multer.memoryStorage()
multer({storage: storage})
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const s3Client = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const uploadParams = {
  Bucket: 'demoshop',
  Key: null,
  Body: null,
  ACL: 'public-read',
}

function checkFileType (file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  const params = uploadParams;
  uploadParams.Key = `${req.file.fieldname}-${Date.now()}${path.extname(req.file.originalname)}`
  uploadParams.Body = req.file.buffer
  s3Client.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({error:"Error -> " + err});
    }
    res.send(`${data.Location}`)
  })
})

module.exports = router
