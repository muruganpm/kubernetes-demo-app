const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json()); // Middleware for parsing JSON requests

const filePath = path.join(__dirname, 'story', 'text.txt');

app.get('/story', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to open file.' });
    }
    res.status(200).json({ story: data.toString() });
  });
});

app.post('/story', (req, res) => {
  const newText = req.body.text;

  if (!newText || typeof newText !== 'string' || newText.trim().length === 0) {
    return res.status(422).json({ message: 'Text must not be empty!' });
  }

  fs.appendFile(filePath, newText + '\n', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Storing the text failed.' });
    }
    res.status(201).json({ message: 'Text was stored!' });
  });
});

// Ensure the server is listening on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

