const crypto = require('crypto');
const config = require('config');
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
  passwordHash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const fieldsToTransfer = ['email', 'username'];

function generatePassword(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password, salt,
      config.get('crypto.hash.iterations'),
      config.get('crypto.hash.length'),
      'sha512',
      (err, key) => {
        if (err) return reject(err);
        resolve(key.toString('hex'));
      }
    );
  });
}

UserSchema.static.fieldsToTransfer = fieldsToTransfer;

UserSchema.methods.setPassword = async function (password)  {
  if (!password.length) {
    throw new Error('Password can\'t be empty');
  }

  this.salt = crypto.randomBytes(config.get('crypto.hash.length')).toString('hex');
  this.passwordHash = await generatePassword(password, this.salt);
}

module.exports = mongoose.model('User', UserSchema);


