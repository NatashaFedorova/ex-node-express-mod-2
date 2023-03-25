const bcrypt = require('bcrypt');
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// async не потрібно
userSchema.methods.checkPassword = (candidate, hash) =>
  bcrypt.compare(candidate, hash);

const User = model('Users', userSchema);

module.exports = User;
