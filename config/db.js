// config/db.js
const mongoose = require('mongoose');

async function connectDB() {
  try {
    console.log('connecting to db...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('db connected');
  } catch (err) {
    console.error('db connection error:', err);
    process.exit(1);
  }
}

module.exports = connectDB;
