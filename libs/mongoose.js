const mongoose = require('mongoose');
const validation = require('mongoose-beautiful-unique-validation');
const config = require('config');

// converts mongo errors to readable validation errors
mongoose.plugin(validation);
mongoose.connect(config.get('mongodb.uri'));

module.exports = mongoose;
