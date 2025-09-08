const express = require('express');
const {mongoDB} = require('./data/database');
const contactsRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API for all contacts is running at /contacts. Individual contacts at contacts/<id>');
});

app.use('/contacts', contactsRoutes);

app.listen(PORT, async () => {
  await mongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});

