// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Replace with your MongoDB connection string
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

app.post('/comments', async (req, res) => {
  try {
    const { name, comment } = req.body;
    const db = client.db('commentsDB');
    const commentsCollection = db.collection('comments');

    const result = await commentsCollection.insertOne({ name, comment });
    res.status(201).json({ id: result.insertedId, name, comment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save comment' });
  }
});