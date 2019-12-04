const mongoose = require('../libs/mongoose');

const UserSchema = new mongoose.Schema({
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
    unique: 'Such e-mail is already registered',
    index: true,
  },
  username: {
    type: String,
    required: 'Username can\'t be empty',
    unique: 'Such username is already taken',
    index: true,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: 'Password can\'t be empty',
  },
  // hash: {
  //   type: String,
  //   required: true,
  // },
  // salt: {
  //   type: String,
  //   required: true,
  // }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);


