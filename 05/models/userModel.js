const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Schema, model } = require('mongoose');
const { enums } = require('../constants');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'User with this email already exists...'], // не працює !!!!!
      lowercase: true,
    },
    birthyear: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(enums.USER_ROLES_ENUM),
      default: enums.USER_ROLES_ENUM.USER,
    },
    avatar: {
      type: String,
      default: 'user-default.png',
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// isModified - метод mongoose ,який перевіряє чи змінюється певне поле
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash('md5').update(this.email).digest('hex');
    this.avatar = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=retro`;
  }

  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// кастомний метод перевіряє чи валідний пароль ввів user
// async не потрібно
userSchema.methods.checkPassword = (candidate, hash) =>
  bcrypt.compare(candidate, hash);

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = model('Users', userSchema);

module.exports = User;
