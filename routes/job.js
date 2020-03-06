const { Job, validateJob } = require('../models/job');
const express = require('express');
const router = express.Router();

function getTime() {
  const currentDate = new Date();
  return (
    'Created: ' +
    currentDate.getDate() +
    '-' +
    currentDate.getMonth() +
    '-' +
    currentDate.getFullYear()
  );
}

//--------------------GET
router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.send(jobs);
});

//--------------------POST
router.post('/', async (req, res) => {
  const { error } = validateJob(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const job = new Job({
    title: req.body.title,
    creationDate: getTime(),
    tasks: []
  });
  await job.save();
  res.send(job);
});

//----------------------DELETE
router.delete('/:id', async (req, res) => {
  const job = await Job.findByIdAndRemove(req.params.id);

  if (!job) return res.status(404).send('That job ID does not exist.');

  res.send(job);
});

module.exports = router;
