const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const mongoose = require('./mongoConnect');
const { Message } = require('./mongoSchemas');

const app = express();
app.use(bodyParser.json());

app.post('/schedule', (req, res) => {
  const { message, day, time } = req.body;
  const schedule = `${time} ${day} * * *`;

  cron.schedule(schedule, () => {
    const newMessage = new Message({ message, scheduledAt: new Date() });
    newMessage.save((err) => {
      if (err) return res.status(500).send('Error saving message');
      console.log('Message saved:', message);
    });
  });

  res.send('Message scheduled');
});

app.listen(3003, () => console.log('Server running on port 3003'));