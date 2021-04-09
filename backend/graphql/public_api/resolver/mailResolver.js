const nodemailer = require('nodemailer')
const feedbackMail = require('../../../emails/feedback')
const aws = require('@aws-sdk/client-ses')
const axios = require('axios')

module.exports = {

  async sendMail ({ data }) {
    let validateResult = false
    console.log(validateResult)
    const secret = '6LcRFp8aAAAAAD0vU9j1hQrxZM-lVB41WbArpPP3'
    await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${data.token}`, {
      method: 'POST',
    }).then(function (response) {
      validateResult = response.data.success
      return response.data.success
    })
    console.log(validateResult)

    if (validateResult) {
      const ses = new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      })

      const transporter = nodemailer.createTransport({
        SES: { ses, aws },
      })
      transporter.sendMail(feedbackMail(data), function (error, info) {
        if (error) {
          throw new Error(`An error occurred while sending an email!: ${error}`)
        }
        return 'sent'
      })
    }

  },
}