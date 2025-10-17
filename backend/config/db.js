const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    console.error('\nPlease check:');
    console.error('1. Your MongoDB Atlas connection string in .env file');
    console.error('2. Your IP address is whitelisted in MongoDB Atlas');
    console.error('3. Your database credentials are correct\n');
    process.exit(1);
  }
};

module.exports = connectDB;
