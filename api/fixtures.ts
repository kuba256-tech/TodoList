import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.db);

  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('tasks');
  } catch (error) {
    console.log('Collection is not created');
  }

  const user1 = new User({
    username: 'user',
    password: '123',
    confirmPassword: '123',
  });
  user1.generateToken();
  await user1.save();

  await db.close();
};

run().catch(console.error);
