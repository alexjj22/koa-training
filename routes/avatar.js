const path = require('path');
const fs = require('fs');
const config = require('config');
const { isFileImage } = require('../helpers');

function streamErrorHandle(error, path) {
  if (error.code === 'LIMIT_EXCEEDED') {
    console.log('too much');
  } else {
    console.error(error);
  }
 
  fs.unlink(path, () => {});
}

module.exports = {
  async post(ctx, next) {
    try {
      const file = ctx.request.files.avatar;

      if (!file.name) {
        ctx.flash('error', 'image: Please select image for uploading');
        return ctx.redirect('back');
      }

      if (!isFileImage(file)) {
        ctx.flash('error', 'image: you are trying to upload file which type is not an image');
        return ctx.redirect('back');
      }

      if (file.size > 1 * 1024 * 1024) {
        ctx.flash('error', 'image: uploaded image can\'t be bigger than 1mb');
        return ctx.redirect('/');
      }

      const user = ctx.state.user;
      const userAvatarDir = path.join(config.get('avatarRoot'), user._id.toString());
      const oldAvatar = user.image;
      const filePath = path.join(userAvatarDir, file.name);

      if (!oldAvatar && !fs.existsSync(userAvatarDir)) {
        fs.mkdirSync(userAvatarDir);
      }

      const rs = fs.createReadStream(file.path);
      const ws = fs.createWriteStream(filePath, {
        flags: 'wx',
      });

      rs
        .pipe(ws)
        .on('error', (e) => streamErrorHandle(e, filePath));
    
      user.image = filePath;

      await user.save();

      if (oldAvatar && oldAvatar !== filePath) fs.unlink(oldAvatar, () => {});

      ctx.flash('success', 'image: you have upload avatar image successfully!');
      ctx.redirect('/');

    } catch (e) {
      console.log(e);
    }
  }
}