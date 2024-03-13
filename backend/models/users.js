const mongoose = require('mongoose');
const validator = require('validator');
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please Enter an Email'],
    lowercase: true,
    unique: [true, 'Email already exists'],
    maxlength: 30,
    validate: [validator.isEmail, 'Please Enter a valid Email'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter a Password'],
    minlength: [8, 'Password too short (Min Length = 8)'],
  },
  profile: {
    type: String,
    required: [true, 'Please upload the image'],
  },
});

module.exports = mongoose.model('users', usersSchema);
