const express = require('express');
const app = express();
const PORT = 8080;

// Mock data for frontend
const data = [
  { id: 1, name: "Item 1", description: "This is item 1" },
  { id: 2, name: "Item 2", description: "This is item 2" },
  { id: 3, name: "Item 3", description: "This is item 3" }
];

// Enable JSON response
app.use(express.json());

// REST endpoint to GET all data
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

