const express = require('express');
const mongoose = require('./mongoConnect');
const { Policy } = require('./mongoSchemas');

const app = express();

app.get('/policies/aggregate', async (req, res) => {
  try {
    const aggregatedData = await Policy.aggregate([
      {
        $group: {
          _id: '$username',
          policies: { $push: '$$ROOT' },
        },
      },
    ]);
    res.json(aggregatedData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3002, () => console.log('Server running on port 3002'));