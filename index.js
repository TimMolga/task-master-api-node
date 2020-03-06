const express = require('express');
const jobs = require('./routes/job');
var cors = require('cors');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taskmaster')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use(cors());
app.use(express.json());
app.use('/api/jobs', jobs);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));