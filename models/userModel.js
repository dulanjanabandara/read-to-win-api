const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A user must have a first name.'],
    maxlength: [25, 'First name cannot be more than 25 characters.'],
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a last name.'],
    maxlength: [25, 'Last name cannot be more than 25 characters.'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email address!'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  //   contactNo: {}
  role: {
    type: String,
    enum: ['user', 'author', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: [8, 'A password must contain at least 8 characters!'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match!',
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
