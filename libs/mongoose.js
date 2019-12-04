const mongoose = require('mongoose');
const validation = require('mongoose-beautiful-unique-validation');

// converts mongo errors to readable validation errors
mongoose.plugin(validation);
mongoose.connect('mongodb://localhost/koa-test-app');

module.exports = mongoose;
