const mongoose = require('../libs/mongoose');

const RegistrationRecordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email can\'t be empty',
    unique: true,
    validate: [
      {
        validator(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        message: 'Incorrect e-mail',
      }
    ],
    unique: 'Such e-mail has been already used for registration',
  },
  verifyToken: {
    type: String,
    required: true,
    index: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now
  }
});

module.exports = mongoose.model('RegistrationRecord', RegistrationRecordSchema);
