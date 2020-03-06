const mongoose = require('mongoose');
const Joi = require('joi');

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
      type: Array
    }
  })
);

function validateJob(job) {
  const schema = {
    title: Joi.string()
      .min(1)
      .max(255)
      .required()
  };
  return Joi.validate(job, schema);
}

exports.Job = Job;
exports.validateJob = validateJob;
