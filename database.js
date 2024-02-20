const mongoose = require('mongoose');
require("dotenv").config()
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI)
    console.log('📦 connected to mongoDB');
  } catch (err) {
    console.error('❌ error connecting to mongoDB:', err.message);
  }
};

const disconnectFromDB = async () => {
  try {
    await mongoose.disconnect()
    console.log('📦 disconnected from mongoDB');
  } catch (err) {
    console.error('❌ error disconnecting from mongoDB:', err.message);
  }
};

const isConnected = () => mongoose.connection.readyState === 1 ? true: false

module.exports = {
  connectToDB,
  disconnectFromDB,
  isConnected
};