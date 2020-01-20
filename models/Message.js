const mongoose = require('../libs/mongoose')

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: 'message must contain a text'
  },
  userId: {
    type: String,
    required: 'message must have an owner'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Message', messageSchema)
