const { Job, Task } = require('../models/job');
const express = require('express');
const router = express.Router();

function getTime() {
  const currentDate = new Date();
  return (
    'Created: ' +
    currentDate.getDate() +
    '-' +
    currentDate.getMonth() +
    1 +
    '-' +
    currentDate.getFullYear()
  );
}

//--------------------GET TASKS
router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.send(jobs);
});

router.get('/:jobId', async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  res.send(job);
});

//--------------------POST JOB
router.post('/', async (req, res) => {
  const job = new Job({
    title: req.body.title,
    creationDate: getTime(),
    tasks: [],
  });
  await job.save();
  res.send(job);
});

//--------------------POST TASK
router.post('/:jobId', async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  job.tasks.push({ name: req.body.name });
  await job.save();
  res.send(job);
});

//----------------------DELETE JOB
router.delete('/:jobId', async (req, res) => {
  const job = await Job.findByIdAndRemove(req.params.jobId);

  if (!job) return res.status(404).send('That job ID does not exist.');

  res.send(job);
});

//----------------------DELETE TASK
router.delete('/:jobId/:taskId', async (req, res) => {
  const task = await Job.tasks.findByIdAndRemove(req.params.taskId);

  if (!task) return res.status(404).send('That task ID does not exist.');

  res.send(task);
});

module.exports = router;
