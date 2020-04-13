const { taskSchema } = require('./task');
const mongoose = require('mongoose');

const Job = mongoose.model(
  'Job',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255
    },
    creationDate: {
      type: String
    },
    tasks: {
      type: [taskSchema]
    }
  })
);

exports.Job = Job;
