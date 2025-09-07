const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function mongoDB() {
  if (!db) {
    try {
      await client.connect();
      db = client.db('project1');
      console.log('✅ Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB', err);
    }
  }
  return db;
}

module.exports = { mongoDB };

