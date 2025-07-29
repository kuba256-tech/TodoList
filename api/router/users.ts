import express from 'express';
import { uploadImage } from '../middleware/multer';
import User from '../models/User';
import { Error } from 'mongoose';
import { error } from 'console';

const usersRouter = express.Router();

usersRouter.post('/', uploadImage.single('avatar'), async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      avatar: req.file ? 'images' + req.file.filename : null,
    };

    const user = new User(newUser);
    user.generateToken();
    await user.save();

    res.status(200).send({
      message: 'new User is registered',
      user,
    });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

usersRouter.post('/session', async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({
        error: 'username  required and password required',
      });
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).send({
        error: 'No username Found',
      });
      return;
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
      res.status(400).send({ error: 'Password is incorrect' });
      return;
    }

    user.generateToken();
    user.save();

    res.status(200).send({
      message: 'Log in success',
      user,
    });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
    }
    next(error);
  }
});

export default usersRouter;
