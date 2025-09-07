const express = require('express');
const {mongoDB} = require('./data/database');
const contactsRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/contacts', contactsRoutes);

app.listen(PORT, async () => {
  await mongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});

