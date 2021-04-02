const nodemailer = require('nodemailer')
const feedbackMail = require('../../../emails/feedback')
const aws = require('@aws-sdk/client-ses')

module.exports = {
  sendMail ({ data }) {
    const ses = new aws.SES({
      apiVersion: "2010-12-01",
      region: "us-east-1",
    });
    const transporter = nodemailer.createTransport({
      SES: { ses, aws },
    });
    transporter.sendMail(feedbackMail(data), function (error, info) {
      if (error) {
        throw new Error(`An error occurred while sending an email!: ${error}`)
      }
      return 'sent'
    })
  },
}