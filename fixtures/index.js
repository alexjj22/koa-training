const mongoose = require('../libs/mongoose');
const users = require('./users');
const User = require('../models/User');

(async () => {
  try {
    await User.deleteMany();

    for (let user of users) {
      const u = new User(user);
      await u.setPassword(user.password);
      await u.save();
    }
    mongoose.disconnect();
    console.log('Users have been successfully stored in a database!');
  } catch (e) {
    console.log('The next error occurred while storing users in a database :(', e);
  }
})();