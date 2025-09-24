const express = require('express');
const { ObjectId } = require('mongodb');
const { mongoDB } = require('../data/database');

const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const db = await mongoDB();
    const contacts = await db.collection('week1').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// GET one contact by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await mongoDB();
    const contact = await db
      .collection('week1')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

//
// ✅ CREATE: POST new contact
//
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // validate required fields
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const db = await mongoDB();
    const result = await db.collection('week1').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    });

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

//
// ✅ UPDATE: PUT update contact by ID
//
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // validate required fields
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const db = await mongoDB();
    const result = await db.collection('week1').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { firstName, lastName, email, favoriteColor, birthday },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.sendStatus(204); // No Content (successful update)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

//
// ✅ DELETE: delete contact by ID
//
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const db = await mongoDB();
    const result = await db.collection('week1').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.sendStatus(204); // No Content (successful delete)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;

