const express = require('express');
const { mongoDB } = require('./data/database');
const contactsRoutes = require('./routes/contacts');
const setupSwagger = require('./swagger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root info
app.get('/', (req, res) => {
  res.send(
    'API for all contacts is running at /contacts. Individual contacts at /contacts/:id and swagger at /api-docs'
  );
});

// Routes
app.use('/contacts', contactsRoutes);

// Swagger docs
setupSwagger(app);

// Start server
app.listen(PORT, async () => {
  await mongoDB(); // connect once at startup
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
