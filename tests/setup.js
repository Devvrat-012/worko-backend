import mongoose from 'mongoose';
import User from '../src/models/user.model.js'; 

export default async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  
  await User.deleteMany();

  await User.create({ email: 'test@example.com', name: 'Test User', age: 30, city: 'Test City', zipCode: '12345' });

  await mongoose.connection.close();
};
