
const morgan = require('morgan');
const express = require('express');

const app = express();

app.use(express.static('../build/default/index.html'));
app.use(morgan('dev'));

const members = require('./routes/members');
const projects = require('./routes/projects');
const tasks = require('./routes/tasks');


app.use('/api/members', members);
app.use('/api/projects', projects);
app.use('/api/tasks', tasks);


module.exports = app;