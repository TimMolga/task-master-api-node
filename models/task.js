const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 255
  }
});

const Task = mongoose.model('Task', taskSchema);

exports.Task = Task;
exports.taskSchema = taskSchema;
