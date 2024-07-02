const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const { Worker } = require('worker_threads');


const app = express();
const upload = multer({ dest: 'uploads/' });

const uploadWorker = (filePath, fileType) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./workerThread.js', {
      workerData: { filePath, fileType },
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { path, mimetype } = req.file;
    const fileType = mimetype === 'text/csv' ? 'csv' : 'xlsx';
    await uploadWorker(path, fileType);
    res.send('File uploaded and data inserted into MongoDB');
  } catch (err) {
    res.status(500).send(err.message);
  } 
});

app.listen(3000, () => console.log('Server running on port 3000'));