import multer from 'multer';
import config from '../config';
import path from 'path';
import { promises as fs } from 'fs';
import { randomUUID } from 'crypto';

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, { recursive: true });
    cb(null, destDir);
  },
  filename: function (req, file, cb) {
    const ex = path.extname(file.originalname);
    cb(null, '/' + randomUUID() + ex);
  },
});

export const uploadImage = multer({ storage });
