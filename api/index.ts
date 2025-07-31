import express from 'express';
import usersRouter from './router/users';
import mongoose from 'mongoose';
import config from './config';
import cors from 'cors';
import tasksRouter from './router/tasks';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://todoapp-theta-eosin.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use(express.static('public'));

const run = async () => {
  if (config.db) await mongoose.connect(config.db);
  app.listen(port, () => {
    console.log(`Servet is running on port http://localhost:${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((e) => {
  console.log('error', e);
});
