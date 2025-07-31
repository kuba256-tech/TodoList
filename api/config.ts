import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const rootPath = __dirname;

const config = {
  rootPath,
  db: process.env.MONGO_URI as string,
  publicPath: path.join(rootPath, 'public'),
};

export default config;
