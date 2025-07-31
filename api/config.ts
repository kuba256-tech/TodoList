import path from 'path';
import dotenv from 'dotenv';

const rootPath = __dirname;
dotenv.config();

const config = {
  rootPath,
  db: process.env.MONGO_URI!,
  publicPath: path.join(rootPath, 'public'),
};

export default config;
