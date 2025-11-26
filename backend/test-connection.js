import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('URI:', process.env.MONGODB_URI?.substring(0, 20) + '...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully!');
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    const dishCount = await db.collection('dishes').countDocuments();
    console.log('Total dishes:', dishCount);
    
    if (dishCount > 0) {
      const sample = await db.collection('dishes').findOne();
      console.log('Sample dish:', sample.dishName);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  }
};

testConnection();