const express = require('express');
const { TeamMember } = require('./model');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ extended: true }));

app.get('/team', async (req, res, next) => {
  const team = await TeamMember.findAll();
  return res.json(team);
});

app.post('/create',  async (req, res, next) => {
  // console.log(req.body);
  const resp =  await TeamMember.create(req.body.values);
  return res.json(resp);
});

module.exports = app;
