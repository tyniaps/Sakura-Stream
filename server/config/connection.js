const mongoose = require('mongoose');

// This defines the MongoDB connection URI. You can use an environment variable when deploying or a local URI.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/animeDatabase';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event listeners for MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
