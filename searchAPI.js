const express = require('express');
const mongoose = require('./mongoConnect');
const { User, Policy } = require('./mongoSchemas');

const app = express();

app.get('/policy/:username', async (req, res) => {
  const { username } = req.params;
  console.log(`userName value ${username}`);
  try {
    const user = await User.findOne({ firstname:username }).populate('policies');
    if (user) {
      res.json(user.policies);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));