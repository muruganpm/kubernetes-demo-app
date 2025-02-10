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
