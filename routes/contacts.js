const express = require('express');
const { ObjectId } = require('mongodb');
const { connectDB } = require('../db/connection');

const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// GET one contact by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await connectDB();
    const contact = await db
      .collection('contacts')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

module.exports = router;

