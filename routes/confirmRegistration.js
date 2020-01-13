const { split, last } = require('lodash')
const RegistrationRecord = require('../models/RegistrationRecord')
const User = require('../models/User')

module.exports = {
  async get (ctx) {
    const registrationRecord = await RegistrationRecord.findOne({
      verifyToken: ctx.params.verifyToken
    })

    ctx.body = ctx.render('confirmRegistration.pug', {
      registrationRecord
    })
  },
  async post (ctx) {
    const verifyToken = last(split(ctx.request.header.referer, '/'))
    const errorRedirectUrl = `/confirmRegistration/${verifyToken}`
    const { username, password } = ctx.request.body

    ctx.errorRedirectUrl = errorRedirectUrl

    const record = await RegistrationRecord.findOne({
      verifyToken
    })

    const user = new User({
      username,
      email: record.email
    })

    await user.setPassword(password)
    await user.save()
    await record.remove()

    ctx.body = ctx.render('registered.pug')
  }
}
