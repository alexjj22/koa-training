const mongoose = require('mongoose')
const validation = require('mongoose-beautiful-unique-validation')
const config = require('config')

// converts mongo errors to readable validation errors
mongoose.plugin(validation)
mongoose.connect(process.env.NODE_ENV === 'test' ? global.__MONGO_URI__ : config.get('mongodb.uri'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

module.exports = mongoose
