const express = require('express');
const {mongoDB} = require('./data/database');
const contactsRoutes = require('./routes/contacts');
const setupSwagger = require('./swagger'); // import swagger config

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API for all contacts is running at /contacts. Individual contacts at contacts/id where "id" is the real id');
});

app.use('/contacts', contactsRoutes);

// Swagger docs
setupSwagger(app);

// Routes
app.use('/contacts', contactsRoutes);

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`📘 Swagger docs at http://localhost:${port}/api-docs`);
});

app.listen(PORT, async () => {
  await mongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});

