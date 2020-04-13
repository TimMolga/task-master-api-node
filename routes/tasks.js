const { Task, Job } = require('../models/task');
const express = require('express');
const router = express.Router();

router.get('/:jobId', async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  res.send(job);
});

//--------------------POST

//----------------------DELETE
router.delete('/:id', async (req, res) => {
  const task = await Job.tasks.id(req.params.id).remove();

  if (!task) return res.status(404).send('That task ID does not exist.');

  res.send(task);
});

module.exports = router;
