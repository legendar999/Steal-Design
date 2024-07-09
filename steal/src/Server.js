const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post('/api/designs', (req, res) => {
  const newDesign = req.body; // Your new design data from the form
  const filePath = path.join(__dirname, 'public', 'designs.json');

  // Read the existing designs
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading designs file');
      return;
    }

    // Parse the existing designs and add the new one
    const designs = JSON.parse(data);
    designs.push(newDesign);

    // Write the updated designs back to the file
    fs.writeFile(filePath, JSON.stringify(designs, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error updating designs file');
        return;
      }

      res.status(200).send('Design added successfully');
    });
  });
});
