const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (HTML)

// Endpoint to handle tutor registration form submission
app.post('/register', (req, res) => {
  const tutorData = req.body; // The form data sent from the frontend

  // Load existing data (if any)
  fs.readFile('tutors.json', (err, data) => {
    let tutors = [];
    if (!err) {
      tutors = JSON.parse(data);
    }

    // Add new tutor data to the list
    tutors.push(tutorData);

    // Save updated data back to the JSON file
    fs.writeFile('tutors.json', JSON.stringify(tutors, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error saving tutor data.');
      }
      res.status(200).send('Tutor registered successfully.');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
